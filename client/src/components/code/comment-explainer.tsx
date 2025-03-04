// A component that adds interactive explanations to code comments
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface CommentExplanationProps {
  // The code block to be explained
  code: string;
  // Optional custom explanations for specific comments
  explanations?: Record<string, string>;
}

export function CommentExplainer({ code, explanations = {} }: CommentExplanationProps) {
  // Split code into lines for processing
  const lines = code.split('\n');

  // Process each line to detect and enhance comments
  const processedLines = lines.map((line, index) => {
    // Detect single-line comments
    const singleLineComment = line.match(/\/\/(.*$)/);
    // Detect parts of multi-line comments
    const multiLineComment = line.match(/\/\*([\s\S]*?)\*\//);

    if (singleLineComment || multiLineComment) {
      const comment = (singleLineComment || multiLineComment)[1].trim();
      const explanation = explanations[comment] || "This comment explains the code's functionality";

      return (
        <div key={index} className="flex items-start gap-2 hover:bg-muted/50 p-1 rounded">
          <span className="font-mono whitespace-pre">{line}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{explanation}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }

    // Return non-comment lines unchanged
    return (
      <div key={index} className="font-mono whitespace-pre">
        {line}
      </div>
    );
  });

  return <div className="bg-muted p-4 rounded-lg">{processedLines}</div>;
}
