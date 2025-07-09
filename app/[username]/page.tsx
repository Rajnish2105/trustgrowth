import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import multiavatar from "@multiavatar/multiavatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, FileX } from "lucide-react";
import LogoutButton from "@/components/root/logout-button";
import RootNav from "@/components/root/root-nav";

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;
  const user = await GetData(decodeURIComponent(username));
  const svgCode = multiavatar(user?.username || "user");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <RootNav> </RootNav>
      <div className="max-w-7xl mx-auto space-y-8 mt-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-1">
            View user details and trading history
          </p>
        </div>

        {/* User Details */}
        <Card className="border-0 shadow-sm bg-slate-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span
                  className="rounded-full overflow-hidden"
                  style={{ width: 70, height: 70, display: "inline-block" }}
                  dangerouslySetInnerHTML={{ __html: svgCode }}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {user?.username}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <LogoutButton />
            </div>
          </CardContent>
        </Card>

        {/* Call History */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Call History</CardTitle>
          </CardHeader>
          {!user?.calls || user.calls.length === 0 ? (
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileX className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No calls found
                </h3>
                <p className="text-gray-500 max-w-sm">
                  This user hasn&apos;t made any trading calls yet. Check back later
                  for updates.
                </p>
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="font-semibold text-gray-700">
                        Stock
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Action
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Entry
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Exit
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Return
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.calls.map((call, index) => (
                      <TableRow key={index} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium text-gray-900">
                          {call.stock}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              call.action === "BUY" ? "default" : "secondary"
                            }
                            className={
                              call.action === "BUY"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {call.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {call.entry}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {call.exit}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              call.return.startsWith("+")
                                ? "text-green-600 font-medium"
                                : "text-red-600 font-medium"
                            }
                          >
                            {call.return}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              call.status === "Profit"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {call.status === "Profit" ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {call.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {call.createdAt.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

async function GetData(username: string) {
  const data = await db.user.findFirst({
    where: {
      username,
    },
    include: {
      calls: true,
    },
  });
  return data;
}
