"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface TreeNodeProps {
  data: any;
  name: string;
  isExpanded: boolean;
  onToggle: () => void;
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  data,
  name,
  isExpanded,
  onToggle,
  level,
}) => {
  const isObject = data !== null && typeof data === "object";
  const isArray = Array.isArray(data);

  const renderValue = () => {
    if (isObject) {
      return isArray ? "[]" : "{}";
    }
    if (typeof data === "string") return `"${data}"`;
    return String(data);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div className="flex items-center">
        {isObject && (
          <span className="cursor-pointer mr-1" onClick={onToggle}>
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        )}
        <span className="text-blue-600">{name}</span>
        {isObject ? (
          <span className="text-gray-500 ml-1">{renderValue()}</span>
        ) : (
          <span className="text-green-600 ml-1">: {renderValue()}</span>
        )}
      </div>
      {isExpanded && isObject && (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <TreeNodeWithState
              key={key}
              name={key}
              data={value}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeNodeWithState: React.FC<{
  name: string;
  data: any;
  level: number;
}> = ({ name, data, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <TreeNode
      name={name}
      data={data}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
      level={level}
    />
  );
};

interface JSONTreeViewProps {
  data: any;
}

export const JSONTreeView: React.FC<JSONTreeViewProps> = ({ data }) => {
  return (
    <div className="font-mono text-sm bg-gray-50 p-4 rounded-md overflow-auto min-h-[300px] max-h-[500px]">
      <TreeNodeWithState name="root" data={data} level={0} />
    </div>
  );
};
