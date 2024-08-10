import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ClinicalCommentAndActionPlanProps {
  clinical_comment?: string;
  action_plan?: string;
}

const ClinicalCommentAndActionPlan: React.FC<
  ClinicalCommentAndActionPlanProps
> = ({ clinical_comment = "", action_plan = "" }) => {
  // State variables for editable content
  const [editableComment, setEditableComment] = useState("");
  const [editableActionPlan, setEditableActionPlan] = useState("");

  // State variables for warning visibility
  const [showCommentWarning, setShowCommentWarning] = useState(false);
  const [showActionPlanWarning, setShowActionPlanWarning] = useState(false);

  // References to store timeout IDs for cleanup
  const commentWarningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const actionPlanWarningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handler for Clinical Comments textarea
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    // Check if the new text starts with the original (non-editable) comment
    if (newText.startsWith(clinical_comment)) {
      // Extract and set the editable portion
      const appendedText = newText.slice(clinical_comment.length);
      setEditableComment(appendedText);
    } else {
      // User attempted to edit the non-editable part
      setShowCommentWarning(true);

      // Clear any existing timeout to avoid overlapping
      if (commentWarningTimeoutRef.current) {
        clearTimeout(commentWarningTimeoutRef.current);
      }

      // Set a timeout to hide the warning after 2 seconds
      commentWarningTimeoutRef.current = setTimeout(() => {
        setShowCommentWarning(false);
      }, 2000);
    }
  };

  // Handler for Action Plans textarea
  const handleActionPlanChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newText = e.target.value;

    // Check if the new text starts with the original (non-editable) action plan
    if (newText.startsWith(action_plan)) {
      // Extract and set the editable portion
      const appendedText = newText.slice(action_plan.length);
      setEditableActionPlan(appendedText);
    } else {
      // User attempted to edit the non-editable part
      setShowActionPlanWarning(true);

      // Clear any existing timeout to avoid overlapping
      if (actionPlanWarningTimeoutRef.current) {
        clearTimeout(actionPlanWarningTimeoutRef.current);
      }

      // Set a timeout to hide the warning after 2 seconds
      actionPlanWarningTimeoutRef.current = setTimeout(() => {
        setShowActionPlanWarning(false);
      }, 2000);
    }
  };

  // Cleanup effect to clear timeouts on component unmount
  useEffect(() => {
    return () => {
      if (commentWarningTimeoutRef.current) {
        clearTimeout(commentWarningTimeoutRef.current);
      }
      if (actionPlanWarningTimeoutRef.current) {
        clearTimeout(actionPlanWarningTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid w-full gap-4">
      <section className="border-t border-b py-4">
        {/* Clinical Comments Section */}
        <h2 className="text-lg font-bold mb-2">Clinical Comments:</h2>
        <Textarea
          value={clinical_comment + editableComment}
          onChange={handleCommentChange}
          className="border-2 border-gray-500"
          placeholder="Add additional comments here"
          rows={6}
        />
        {showCommentWarning && (
          <div className="text-red-500 mt-1">
            Original comments cannot be edited.
          </div>
        )}

        {/* Action Plans Section */}
        <h2 className="text-lg font-bold mt-6 mb-2">Action Plans:</h2>
        <Textarea
          value={action_plan + editableActionPlan}
          onChange={handleActionPlanChange}
          className="border-2 border-gray-500"
          placeholder="Add additional action plans here"
          rows={6}
        />
        {showActionPlanWarning && (
          <div className="text-red-500 mt-1">
            Original action plans cannot be edited.
          </div>
        )}
      </section>
    </div>
  );
};

export default ClinicalCommentAndActionPlan;
