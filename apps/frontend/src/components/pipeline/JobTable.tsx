import { getJobDetails } from '@/services/job';
import useJobStore from '@/stores/JobStore';
import { relativeTimeBetweenTwoDates, toRelativeDate } from '@/utils/date';
import { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

export default function JobTable() {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'Image Count',
        accessor: 'imageCount',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Progress',
        accessor: 'progress',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
      {
        Header: 'Duration',
        accessor: 'duration',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
      },
    ],
    []
  );

  const { jobs, updateJob } = useJobStore((state) => ({
    jobs: state.jobs,
    updateJob: state.updateJob,
  }));

  const tableInstance = useTable({
    // @ts-ignore
    columns,
    data: jobs,
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table {...getTableProps()} className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.getHeaderProps().key} className="px-6 py-3">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {jobs.length === 0 ? (
          <tbody>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">No jobs found</td>
            </tr>
          </tbody>
        ) : (
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.getRowProps().key} className="bg-white border-b hover:bg-gray-50">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={cell.getCellProps().key}
                        className="px-6 py-4 text-gray-900 whitespace-nowrap"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}
