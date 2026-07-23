"use client";

import { useState } from "react";
import { Sparkles, FileText, PanelLeftClose } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isDisabled = !title.trim() || !content.trim();

  const handleGenerate = () => {
    console.log({
      title,
      content,
    });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b bg-white px-5">
        <h1 className="text-lg font-semibold">Quiz app</h1>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
          user
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className="w-16 border-r bg-white">
          <div className="flex justify-center pt-5">
            <PanelLeftClose className="h-5 w-5 text-muted-foreground" />
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1 px-5 py-8 md:px-10">
          <Card className="mx-auto w-full max-w-3xl shadow-none">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="h-5 w-5" />
                Article Quiz Generator
              </CardTitle>

              <CardDescription>
                Paste your article below to generate a summarize and quiz
                question. Your articles will saved in the sidebar for future
                reference.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="flex items-center gap-1 text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  Article Title
                </label>

                <Input
                  id="title"
                  placeholder="Enter a title for your article..."
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className="flex items-center gap-1 text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  Article Content
                </label>

                <Textarea
                  id="content"
                  placeholder="Paste your article content here..."
                  className="min-h-32 resize-none"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleGenerate}
                  disabled={isDisabled}
                >
                  Generate summary
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}