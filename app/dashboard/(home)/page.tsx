"use client";

import {Card,CardHeader,CardBody} from "@heroui/card";
import {Table,TableHeader,TableBody,TableRow,TableCell,TableColumn} from "@heroui/table";
import { Avatar } from "@heroui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import { Calendar } from "@heroui/calendar";
import { CalendarDate } from "@internationalized/date";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


export default function Dashboard() {
    // fetch user data
    const { data: session } = useSession();
    const username = session?.user?.name ?? "User";

    // metric variables
    const [admins, setAdmins] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [viewerCount, setViewerCount] = useState(0);

    // fetch metrics
    useEffect(() => {
      const fetchAllMetrics = async () => {
        try {
          const [viewRes, adminRes, unreadRes, eventsRes] = await Promise.all([
            fetch("/api/visitors"),
            fetch("/api/users"),
            fetch("/api/contact/unreadCount"),
            fetch("/api/events"),
          ]);

          // fetch visitor count
          const viewData = await viewRes.json();
          // fetch admin count
          const adminData = await adminRes.json();
          // fetch unread tickets count
          const unreadData = await unreadRes.json();
          // fetch upcoming events count
          const eventData = await eventsRes.json();

          setViewerCount(viewData.count || 0);
          setAdmins(adminData.users || []);
          setUnreadCount(unreadData.unreadCount || 0);
          setUpcomingCount(eventData.upcomingCount || 0);
        } catch (err) {
            console.error("Failed to fetch dashboard metrics:", err);
        }
      };

      fetchAllMetrics();
    }, []);

    // metrics
    const metrics = [
      { title: "Visitor Count", value: String(viewerCount), subtitle: "Total visitors" },
      { title: "Admin Count", value: String(admins.length), subtitle: "Active admins" },
      { title: "Unread Tickets", value: String(unreadCount), subtitle: "Needs attention" },
      { title: "Upcoming Events", value: String(upcomingCount), subtitle: "Coming soon" },
    ];

    return (
      <div className="flex flex-col gap-6 px-4 pb-4">
        {/* header */}
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 my-2">
          <div>
            <h1 className="text-xl font-semibold">Welcome Back, {username}!</h1>
            <p className="text-sm text-default-500">
              Here's your dashboard overview for today.
            </p>
          </div>
        </div>

        {/* metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((item, index) => (
            <Card key={index} className="px-4 py-2">
              <CardHeader>
                <h2 className="text-md font-medium text-foreground">
                  {item.title}
                </h2>
              </CardHeader>
              <CardBody>
                <p className="text-2xl font-bold text-primary">{item.value}</p>
                <p className="text-xs text-default-500">{item.subtitle}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* table */}
          <div className="w-full lg:w-[80%]">
            <Card className="px-4 py-2">
              <CardHeader>
                <h2 className="text-md font-medium text-foreground">
                  Admin List
                </h2>
              </CardHeader>
              <CardBody className="mb-2">
                <Table aria-label="Recent activity table">
                  {/* table header */}
                  <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Creation Date</TableColumn>
                    <TableColumn>Role</TableColumn>
                  </TableHeader>
                  {/* table body */}
                  <TableBody>
                    {admins.map((admin: any) => (
                      <TableRow key={admin._id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <PersonIcon className="w-4 h-4" />
                            </Avatar>
                            <span>{admin.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{new Date(admin.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className="text-primary font-semibold">Admin</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </div>

          {/* calendar */}
          <div className="w-full lg:w-[28%]">
            <Card className="h-full px-4 py-2">
              <CardHeader>
                <h2 className="text-md font-medium text-foreground">Calendar</h2>
              </CardHeader>
              <CardBody className="flex justify-center items-center">
                <Calendar defaultValue={ new CalendarDate( new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())}/>
              </CardBody>
            </Card>
          </div>

        </div>

      </div>
    );
}
