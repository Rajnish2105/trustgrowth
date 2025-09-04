import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import multiavatar from "@multiavatar/multiavatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Shield, Crown, Clock } from "lucide-react";
import LogoutButton from "@/components/root/logout-button";
import RootNav from "@/components/root/root-nav";

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;
  const user = await GetData(decodeURIComponent(username));
  const svgCode = multiavatar(user?.username || "user");

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              User Not Found
            </h2>
            <p className="text-gray-600">
              The requested user profile could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <RootNav> </RootNav>
      <div className="max-w-7xl mx-auto space-y-8 mt-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-1">Account details and information</p>
        </div>

        {/* Main Profile Card */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <span
                  className="rounded-full overflow-hidden border-4 border-gray-100"
                  style={{ width: 120, height: 120, display: "inline-block" }}
                  dangerouslySetInnerHTML={{ __html: svgCode }}
                />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user.username}
                </h2>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      Joined{" "}
                      {user.createdAt.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <p className="text-gray-600">Plan: </p>
                    <p className="font-bold text-green-800">{user.plan}</p>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="flex-shrink-0">
                <LogoutButton />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Role Card */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                    className={
                      user.role === "ADMIN"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan Card */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Crown className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <Badge
                    variant={user.plan === "PREMIUM" ? "default" : "secondary"}
                    className={
                      user.plan === "PREMIUM"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {user.plan}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Provider Card */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Sign-in Method
                  </p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {user.provider}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Timeline */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Account Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Account Created</p>
                  <p className="text-sm text-gray-600">
                    {user.createdAt.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-600">
                    {user.updatedAt.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
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
  });
  return data;
}
