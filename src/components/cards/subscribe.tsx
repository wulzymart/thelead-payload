"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Subscribe() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscribe</CardTitle>
        <CardDescription>
          Subscribe to our newsletters and magazines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-wrap gap-4">
          <Input type="email" placeholder="Enter your email" />
          <Button>Subscribe</Button>
        </form>
      </CardContent>
    </Card>
  );
}
