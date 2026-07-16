import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import ActionsManagementBar from './Components/ActionsManagementBar.jsx';
import FiltersUtilityBar from './Components/FiltersUtilityBar.jsx';
import MessagesTable from './Components/MessagesTable.jsx';
import PaginationUtilityBar from './Components/PaginationUtilityBar.jsx';
import { account, tablesDB, ID, Query  } from "../appwrite.js";
import { getErrorMessage } from "../helpers/ErrorMessages.js";
import { useUser } from "../context/UserContext.jsx";

const Messages = () => {
  const [searchParams, setSearchParams] = useSearchParams();  
  const [loading, setLoading] = useState(true);
  const [processedMessages, setProcessedMessages] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [sortBy, setSortBy] = useState('default');
  const [folderQuery, setFolderQuery] = useState('');
  const [messageQuery, setMessageQuery] = useState('');
  const [ownerQuery, setOwnerQuery] = useState('');
  const [equalQueries, setEqualQueries] = useState([]);

  const {user} = useUser();
  const navigate = useNavigate();

  async function init() {
    try {
      setLoading(true);
      setSelectedIds(new Set());

      const queries = buildQueries();

      const result = await tablesDB.listRows({
        databaseId: "669318d2002a5431ce91",
        tableId: "6695461400342d012490",
        queries
      });

      setProcessedMessages(result.rows);

    } catch (error) {
      console.error(error);
      //alert(getErrorMessage(error, "load messages", user));
    } finally {
      setLoading(false);
    }
  }
      
    
  useEffect(() => {
      syncFiltersFromUrl();
      init();
  }, [searchParams]);


  const syncFiltersFromUrl = () => {
  setSelectedIds(new Set());
  setFolderQuery("");
  setMessageQuery("");
  setOwnerQuery("");
  setSortBy("default");
  setEqualQueries([]);

  searchParams.getAll("contains").forEach(param => {
    const [field, ...value] = param.split(",");
    const search = value.join(",");

    switch (field) {
      case "folder":
        setFolderQuery(search);
        break;

      case "message":
        setMessageQuery(search);
        break;

      default:
        break;
    }
  });

    searchParams.getAll("equal").forEach(param => {
      const [field, ...value] = param.split(",");
      if (field && value.length) {
        setEqualQueries(prevArray => [...prevArray, field + "," + value.join(",")]);
      }
    });

  const orderAsc = searchParams.get("orderAsc");
  const orderDesc = searchParams.get("orderDesc");

  const owner = searchParams.get("owner");
  if(owner !== null)
  {
    setOwnerQuery(owner);
  }

  if (orderDesc === "seen") {
    setSortBy("fresh");
  } else if (orderAsc === "seen") {
    setSortBy("stale");
  } else if (orderAsc === "$createdAt") {
    setSortBy("oldest");
  } else if (orderDesc === "$createdAt") {
    setSortBy("newest");
  }
};

  const buildQueries = () => {
    const queries = [];

    // contains=field,value
    searchParams.getAll("contains").forEach(param => {
      const [field, ...value] = param.split(",");
      if (field && value.length) {
        queries.push(Query.contains(field, value.join(",")));
      }
    });

    // equal=field,value
    searchParams.getAll("equal").forEach(param => {
      const [field, ...value] = param.split(",");
      if (field && value.length) {
        queries.push(Query.equal(field,value.join(",")));
      }
    });

    const owner = searchParams.get("owner");
    if(owner)
    {
      queries.push(Query.equal("owner", owner));
    }


    // offset=50
    const offset = searchParams.get("offset");
    if (offset) {
      queries.push(Query.offset(Number(offset)));
    }

    // orderAsc=field
    searchParams.getAll("orderAsc").forEach(field => {
      queries.push(Query.orderAsc(field));
    });

    // orderDesc=field
    searchParams.getAll("orderDesc").forEach(field => {
      queries.push(Query.orderDesc(field));
    });

    queries.push(Query.orderDesc("$updatedAt"));
    return queries;
  };

const onSearchSubmit = () => {
    const params = new URLSearchParams();

    console.log(equalQueries.length);

    for(let i = 0; i < equalQueries.length; i++)
    {
      params.append("equal", equalQueries[i]);
    }
    if (folderQuery.trim()) {
        params.append("contains", `folder,${folderQuery.trim()}`);
    }

    if (messageQuery.trim()) {
        params.append("contains", `message,${messageQuery.trim()}`);
    }

    if(ownerQuery.trim()) {
      params.append("owner", ownerQuery.trim());
    }

    switch (sortBy) {
        case "fresh":
            params.append("orderDesc", "seen");
            break;

        case "stale":
            params.append("orderAsc", "seen");
            break;

        case "oldest":
            params.append("orderAsc", "$createdAt");
            break;

        case "newest":
            params.append("orderDesc", "$createdAt");
            break;
    }

    setSearchParams(params);
};

  const handleSelectRow = (id) => {

    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === processedMessages.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(processedMessages.map(msg => msg.$id)));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the ${selectedIds.size} selected message(s)?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      await Promise.all(
        [...selectedIds].map(id =>
          tablesDB.deleteRow({
            databaseId: "669318d2002a5431ce91",
            tableId: "6695461400342d012490",
            rowId: id,
          })
        )
      );

      setSelectedIds(new Set());
    } catch (error) {
      console.error(error);
      alert(getErrorMessage(error, `delete the ${selectedIds.size} selected message(s)`, user));
    }
    finally
    {
      await init();
    }
  };

  const handleShuffleSelected = async () => {
  if (selectedIds.size === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to shuffle the ${selectedIds.size} selected message(s)?`
    );

    if (!confirmed) return;

  try {
    setLoading(true);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const newest = now - oneDay;          // yesterday
    const oldest = now - (365 * oneDay);  // one year ago

    await Promise.all(
      [...selectedIds].map(id => {
        const randomTimestamp =
          oldest + Math.random() * (newest - oldest);

        return tablesDB.updateRow({
          databaseId: "669318d2002a5431ce91",
          tableId: "6695461400342d012490",
          rowId: id,
          data: {
            seen: new Date(randomTimestamp).toISOString(),
          },
        });
      })
    );

    setSelectedIds(new Set());
  } catch (error) {
    console.error(error);
      alert(getErrorMessage(error, `shuffle the ${selectedIds.size} selected message(s)`, user));
  }
  finally
  {
    await init();
  }
};

  return (
    loading ? (<p>Loading...</p>) : (
    <div>
      <ActionsManagementBar 
        selectionCount={selectedIds.size}
        totalCount={processedMessages.length}
        isAllSelected={processedMessages.length > 0 && selectedIds.size === processedMessages.length}
        onSelectAll={handleSelectAll}
        onDelete={handleDeleteSelected}
        onEdit={() => navigate(`/messages/edit/${Array.from(selectedIds)}`)}
        onShuffle={handleShuffleSelected}
        onCreate={() => navigate("/messages/create")}
      />

      <FiltersUtilityBar 
        folderQuery={folderQuery} setFolderQuery={setFolderQuery}
        messageQuery={messageQuery} setMessageQuery={setMessageQuery}
        sortBy={sortBy} setSortBy={setSortBy}
        onSearchSubmit={onSearchSubmit}
      />

      <MessagesTable 
        messages={processedMessages}
        selectedIds={selectedIds}
        onSelectRow={handleSelectRow}
      />

      <PaginationUtilityBar
        offset={Number(searchParams.get("offset") ?? 0)}
        onPageChange={(newOffset) => {
          setSearchParams({
            ...Object.fromEntries(searchParams),
            offset: newOffset,
          });
        }}
        totalRows={processedMessages.length}
      />
    </div>)
  );
};

export default Messages;

