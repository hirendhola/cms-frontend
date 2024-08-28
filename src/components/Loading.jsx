import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const Loading = (loading) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(timer);
            return prevProgress;
          }
          return prevProgress + 30;
        });
      }, 100);

      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center flex-col items-center  max-w-md mx-auto p-4">
        <p className="text-center text-xl mb-2">Loading...</p>
        <Progress value={progress} className="w-full" />
      </div>
    );
  }

}

export default Loading