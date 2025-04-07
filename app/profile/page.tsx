"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Pencil, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AppHeader } from "@/components/app-header";
import { useToast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    bio?: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <AppHeader />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">My Profile</h1>
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">
                {user?.name || "Your Name"}
              </CardTitle>
              <CardDescription>Learner/Host</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Email</p>
                <p>{user?.email || "your@email.com"}</p>
              </div>
              <div>
                <p className="font-semibold">Bio</p>
                <p>
                  {user?.bio ||
                    "Passionate about learning and teaching programming concepts. I enjoy hosting sessions on JavaScript and React."}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
