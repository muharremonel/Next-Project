import React, { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import LoadingComponent from './Loading';

interface TableColumn {
  header: string;
  accessor: string;
  width?: string;
}


interface TableProps {
  columns: TableColumn[];
  dataLength: number;
  filteredData: any[];
  onClick?: Function
}

const getColumnWidth = (col: TableColumn) => col.width || '1fr';

const Table: React.FC<TableProps> = ({ columns, dataLength, filteredData, onClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [parent] = useAutoAnimate()

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortColumn, sortOrder]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const pageNumbersToShow = 5;

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  let startPage = Math.max(currentPage - Math.floor(pageNumbersToShow / 2), 1);
  let endPage = Math.min(startPage + pageNumbersToShow - 1, totalPages);

  if (endPage - startPage < pageNumbersToShow - 1) {
    startPage = Math.max(endPage - pageNumbersToShow + 1, 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='relative flex flex-col w-full items-center gap-4 border rounded-lg pb-4 h-[500px] overflow-y-auto overflow-x-hidden'>
        <div ref={parent} className='w-full'>
          <div
            style={{
              gridTemplateColumns: `${columns.map(getColumnWidth).join(' ')} ${onClick ? '1fr' : ''}`
            }}
            className={`sticky top-0 grid place-items-center w-full bg-tableHead py-6`}
          >
            {columns.map((col, index: number) => (
              <div
                key={`${col.header}header`}
                className="font-medium text-tableHeadText cursor-pointer"
                onClick={() => handleSort(col.accessor)}
              >
                {col.header}
                {sortColumn === col.accessor && (sortOrder === "asc" ? ' ↑' : ' ↓')}
              </div>
            ))}
          </div>
          {filteredData ? paginatedData?.map((row, index: number) => (
            <div
              key={`${row.id}${row._id}row`}
              style={{
                gridTemplateColumns: `${columns.map(getColumnWidth).join(' ')} ${onClick ? '1fr' : ''}`
              }}
              className={`grid place-items-center w-full gap-2 p-4`}
            >
              {columns.map((col, index: number) => (
                <div key={`${col.accessor}column`} className='text-center'>{row[col.accessor]}</div>
              ))}
              {onClick && <button onClick={() => onClick(row)}>View Info</button>}
            </div>
          )) : <LoadingComponent />}
        </div>
      </div>
      <div className='h-[1px] w-full bg-gray-300' />
      <div className='w-full flex justify-center gap-2'>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? 'font-bold' : ''}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage(prev => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Table;
