import { useState } from "react";

import UploadZone from "../components/resume/UploadZone";
import ResumeList from "../components/resume/ResumeList";

function UploadResume() {

  const [result, setResult] = useState(null);

  return (

    <div className="space-y-8">

      <UploadZone
        setResult={setResult}
      />

      {result && (
        <ResumeList
          result={result}
        />
      )}

    </div>

  );

}

export default UploadResume;