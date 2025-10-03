"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/getQuestions`)
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const paginatedQuestions = questions.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalPages = Math.ceil(questions.length / pageSize);
  console.log("Questions:", questions);

  return (
    <div className="p-4 bg-white shadow rounded-xl space-y-3">
      <h2 className="text-xl font-semibold mb-4">All Questions</h2>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CA TYPE</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Subtopic</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedQuestions.map((q) => (
            <TableRow
              key={q.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedQuestion(q)}
            >  <TableCell className="max-w-xs truncate">{q.ca_type}</TableCell>
              <TableCell className="max-w-xs truncate">{q.question}</TableCell>
              <TableCell className="max-w-xs truncate">{q.answer}</TableCell>
              <TableCell>{q.subject?.name}</TableCell>
              <TableCell>{q.topic?.name}</TableCell>
              <TableCell>{q.subtopic?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <div className="space-y-3">
              <p><span className="font-semibold">CA Type:</span> {selectedQuestion.ca_type || "N/A"}</p>
              <p><span className="font-semibold">Subject:</span> {selectedQuestion.subject?.name}</p>
              <p><span className="font-semibold">Topic:</span> {selectedQuestion.topic?.name}</p>
              <p><span className="font-semibold">Subtopic:</span> {selectedQuestion.subtopic?.name}</p>
              <p><span className="font-semibold">Question:</span> {selectedQuestion.question}</p>
              <p><span className="font-semibold">Answer:</span> {selectedQuestion.answer}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
