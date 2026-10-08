import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner color="success" />
    </div>
  );
};

export default Loading;
