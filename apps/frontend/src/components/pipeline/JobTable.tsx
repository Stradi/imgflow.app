import { getJobDetails } from '@/services/job';
import useJobStore from '@/stores/JobStore';
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
        Header: 'Status',
        accessor: 'status',
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
      updateJob(id, job['data']);
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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.getHeaderProps().key}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.getRowProps().key}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} key={cell.getCellProps().key}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
