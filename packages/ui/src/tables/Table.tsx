import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Settings2 } from 'lucide-react';

export interface TableColumn<T> {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface TableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T, index: number) => void;
  variant?: 'primary' | 'danger';
}

interface TableProps<T extends { id: string }> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  itemsPerPage?: number;
  onRowClick?: (row: T, index: number) => void;
  emptyState?: {
    title?: string;
    description?: string;
  };
  showRowNumbers?: boolean;
  isLoading?: boolean;
}

const DEFAULT_ITEMS_PER_PAGE = 10;

export const Table = React.forwardRef<HTMLDivElement, TableProps<any>>(
  (
    {
      columns,
      data,
      actions,
      itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
      onRowClick,
      emptyState = {
        title: 'No data',
        description: 'No records found',
      },
      showRowNumbers = true,
      isLoading = false,
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() =>
      columns.reduce((acc, col) => {
        // Check if column has isVisible property, default to true if not specified
        acc[col.key] = (col as any).isVisible !== false;
        return acc;
      }, {} as Record<string, boolean>)
    );
    const [showColumnMenu, setShowColumnMenu] = useState(false);

    // Update visibility when columns change (e.g., when field.isVisible is updated)
    React.useEffect(() => {
      setColumnVisibility(prev => {
        const newVisibility = { ...prev };
        columns.forEach(col => {
          // Sync with field's isVisible property
          const fieldIsVisible = (col as any).isVisible !== false;
          if (newVisibility[col.key] !== fieldIsVisible) {
            newVisibility[col.key] = fieldIsVisible;
          }
        });
        return newVisibility;
      });
    }, [columns]);

    const dataArray = Array.isArray(data) ? data : [];
    const visibleColumns = columns.filter(col => columnVisibility[col.key]);
    const totalPages = Math.ceil(dataArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = dataArray.slice(startIndex, endIndex);

    // Reset to first page if current page exceeds total pages
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      );
    }

    return (
      <div ref={ref} className="w-full">
        {/* Column Visibility Controls */}
        <div className="relative mb-4">
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Settings2 className="w-4 h-4" />
            Columns
          </button>

          {showColumnMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-48">
              <div className="p-2">
                {columns.map((column) => (
                  <button
                    key={column.key}
                    onClick={() =>
                      setColumnVisibility((prev) => ({
                        ...prev,
                        [column.key]: !prev[column.key],
                      }))
                    }
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded transition-colors text-sm text-left"
                  >
                    {columnVisibility[column.key] ? (
                      <Eye className="w-4 h-4 text-blue-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    )}
                    <span className={columnVisibility[column.key] ? 'text-slate-900' : 'text-slate-500'}>
                      {column.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Table Header */}
        <div className="sticky top-0 bg-slate-50 border-b border-slate-200">
          <div className="flex">
            {showRowNumbers && (
              <div className="w-12 min-w-12 px-4 py-3 border-r border-slate-200 bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
                #
              </div>
            )}
            {visibleColumns.map((column) => (
              <div
                key={column.key}
                style={{ width: column.width, flexBasis: column.width ? 'auto' : '0' }}
                className={`${
                  column.width ? '' : 'flex-1'
                } px-4 py-3 border-r border-slate-200 text-sm font-semibold text-slate-700 bg-slate-50 overflow-hidden`}
              >
                {column.label}
              </div>
            ))}
            {actions && actions.length > 0 && (
              <div className="w-24 min-w-24 px-4 py-3 flex items-center justify-center text-xs font-semibold text-slate-600">
                Actions
              </div>
            )}
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-200">
          {paginatedData.map((row, idx) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
              className={`flex hover:bg-blue-50 transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onRowClick?.(row, startIndex + idx)}
            >
              {showRowNumbers && (
                <div className="w-12 min-w-12 px-4 py-3 border-r border-slate-200 flex items-center justify-center text-xs text-slate-600">
                  {startIndex + idx + 1}
                </div>
              )}
              {visibleColumns.map((column) => (
                <div
                  key={column.key}
                  style={{ width: column.width, flexBasis: column.width ? 'auto' : '0' }}
                  className={`${
                    column.width ? '' : 'flex-1'
                  } px-4 py-3 border-r border-slate-200 text-sm text-slate-700 break-words overflow-hidden`}
                >
                  {column.render
                    ? column.render(row[column.key], row, startIndex + idx)
                    : row[column.key] !== undefined && row[column.key] !== null
                    ? String(row[column.key])
                    : '-'}
                </div>
              ))}
              {actions && actions.length > 0 && (
                <div className="w-24 min-w-24 px-4 py-3 flex items-center justify-center gap-1">
                  {actions.map((action, actionIdx) => (
                    <motion.button
                      key={actionIdx}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(row, startIndex + idx);
                      }}
                      className={`p-1 rounded transition-colors ${
                        action.variant === 'danger'
                          ? 'hover:bg-red-100 text-red-600'
                          : 'hover:bg-blue-100 text-blue-600'
                      }`}
                      title={action.label}
                    >
                      {action.icon}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {dataArray.length === 0 && (
          <div className="flex items-center justify-center h-40 bg-slate-50">
            <div className="text-center">
              <p className="text-slate-600 font-medium">{emptyState.title}</p>
              <p className="text-sm text-slate-500 mt-1">{emptyState.description}</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {dataArray.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to {Math.min(endIndex, dataArray.length)} of{' '}
              {dataArray.length} records
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      page === currentPage ||
                      page === currentPage - 1 ||
                      page === currentPage + 1
                    );
                  })
                  .map((page, pageIdx, arr) => (
                    <div key={page}>
                      {pageIdx > 0 && arr[pageIdx - 1] !== page - 1 && (
                        <span className="px-1 text-slate-400">...</span>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {page}
                      </motion.button>
                    </div>
                  ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Table.displayName = 'Table';
