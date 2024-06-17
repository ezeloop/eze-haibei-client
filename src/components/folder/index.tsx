import React from "react";

interface FolderProps {
  name: string;
  id: string;
  onClick: () => void;
}

const Folder: React.FC<FolderProps> = ({ name, onClick }) => (
  <div className="folder" onClick={onClick}>
    {name}
  </div>
);

export default Folder;
