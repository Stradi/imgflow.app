import { getJobDetails } from '@/services/job';
import useJobStore from '@/stores/JobStore';
import { relativeTimeBetweenTwoDates, toRelativeDate } from '@/utils/date';
import { cn } from '@/utils/tw';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect } from 'react';
import JobImagesModal from './JobImagesModal';

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor<any, any>('id', {
    cell: (cell) => <span>{cell.getValue()}</span>,
    header: 'ID',
  }),
  columnHelper.accessor<any, any>('status', {
    cell: (cell) => {
      const status = cell.getValue();
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'completed'
              ? 'bg-green-100 text-green-800'
              : status === 'active'
              ? 'bg-blue-100 text-blue-800'
              : status === 'waiting'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      );
    },
    header: 'Status',
  }),
  columnHelper.accessor<any, any>('progress', {
    cell: (cell) => <span>{cell.getValue()}</span>,
    header: 'Progress',
  }),
  columnHelper.accessor<any, any>('imageCount', {
    cell: (cell) => <span>{cell.getValue()}</span>,
    header: 'Image Count',
  }),
  columnHelper.accessor<any, any>('createdAt', {
    cell: (cell) => <span>{cell.getValue()}</span>,
    header: 'Created At',
  }),
  columnHelper.accessor<any, any>('duration', {
    cell: (cell) => <span>{cell.getValue()}</span>,
    header: 'Duration',
  }),
  columnHelper.accessor<any, any>('actions', {
    cell: (cell) => <span>{cell.getValue()}</span>,
    header: 'Actions',
  }),
];

export default function JobTable() {
  const { jobs, updateJob } = useJobStore((state) => ({
    jobs: state.jobs,
    updateJob: state.updateJob,
  }));

  const tableInstance = useReactTable({
    // @ts-ignore
    columns,
    data: jobs,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function fetchJobStatus(id: string) {
      const job = await getJobDetails(id);
      updateJob(id, {
        id: job['data']['id'],
        status: job['data']['status'],
        imageCount: job['data']['imageCount'],
        progress: `${job['data']['progress']}%`,
        createdAt: toRelativeDate(job['data']['createdAt']),
        duration: job['data']['finishedAt']
          ? relativeTimeBetweenTwoDates(new Date(job['data']['createdAt']), new Date(job['data']['finishedAt']))
          : relativeTimeBetweenTwoDates(new Date(job['data']['createdAt']), new Date()),
        actions:
          job['data']['status'] === 'completed' ? <JobImagesModal job={job['data']} /> : <p>No actions available</p>,
      });
    }

    const activeJobs = jobs.filter((job) => job.status === 'active' || job.status === 'waiting');
    if (activeJobs.length === 0) return;

    const intervalId = setInterval(() => {
      for (const activeJob of activeJobs) {
        fetchJobStatus(activeJob.id);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [jobs, updateJob]);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full table-fixed text-sm text-left text-gray-600 border-gray-200 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={cn(`px-3 py-2`)}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {jobs.length === 0 ? (
          <tbody>
            <tr>
              <td className="px-3 py-1 font-medium text-gray-900 whitespace-nowrap">No jobs found</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {tableInstance.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition duration-100 hover:text-gray-950">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={cn(`px-3 py-1`)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
