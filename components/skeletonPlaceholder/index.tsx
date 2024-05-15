import React from "react";

interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
}

const SkeletonPlaceholder = ({ isLoading, children, skeleton }: Props) => {
  if (isLoading) return skeleton;

  return children;
};

export default SkeletonPlaceholder;
