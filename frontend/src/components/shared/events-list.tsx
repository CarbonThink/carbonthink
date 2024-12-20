import { EventLog } from '@/contexts/data-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export function EventsList({ title, eventLogs = undefined }: { title?: string; eventLogs: EventLog[] | undefined }) {
  return (
    <Card>
      <CardHeader className="bg-muted">
        <CardTitle>{title || 'Latest Events'}</CardTitle>
        <CardDescription>List of the latest events that occurred.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 lg:w-[min(calc(100vw-330px-var(--scrollbarwpx)),974px)] md:w-[calc(100vw-254px-var(--scrollbarwpx))] w-[max(calc(100vw-34px-var(--scrollbarwpx)),393px)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-36">Block number</TableHead>
              <TableHead>Event name</TableHead>
              <TableHead>Arguments</TableHead>
              <TableHead>Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!eventLogs ? (
              [...new Array(3)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-1/2" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-1/2" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-1/2" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-1/2" />
                  </TableCell>
                </TableRow>
              ))
            ) : eventLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No event yet.</TableCell>
              </TableRow>
            ) : (
              eventLogs?.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <a href={`https://sepolia.basescan.org/block/${Number(event.blockNumber)}`} target="_blank">
                      <Badge variant="outline">
                        {Number(event.blockNumber)}
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Badge>
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge>{event.eventName}</Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 flex-col">
                    {Object.entries({ ...event.args }).map(([k, v], index) => (
                      <div key={index} className="flex gap-2">
                        {k}
                        <Badge variant="secondary">{String(v)}</Badge>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <a href={`https://sepolia.basescan.org/tx/${event.transactionHash}`} target="_blank">
                      <Badge variant="outline">
                        Transaction
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Badge>
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
