import DefaultLoader from "@/components/Loader";
import { AutosizeTextarea } from "@/components/ui/autosizetextarea";
import { Input } from "@/components/ui/input";
import { collectionsConfig } from "@/config/collections";
import { API_BASE } from "@/config/constants";
import { useAuth } from "@/hooks/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const IngestOutput = ({
//   source,
//   title,
//   data,
// }: {
//   source: string;
//   title: string;
//   data: any;
// }) => {
//   return (
//     <div>
//       <h2 className="text-xl">{title}</h2>
//       <AutosizeTextarea value={JSON.stringify(data, undefined, 4)} />
//     </div>
//   );
// };

// Stage 0: loading
// Stage 1: select a file for upload
// Stage 2: validate results of ingest
// Stage 3: ask to do another
const Ingester = () => {
  const navigate = useNavigate();
  const { user, isPending } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>();
  const [output, setOutput] = useState<any>(null);
  const [stage, setStage] = useState(1);
  const [source, setSource] = useState("");

  const uploadFile = useMutation({
    mutationKey: ["UploadFile"],
    mutationFn: async () => {
      const formData = new FormData();
      if (file) {
        setStage(0);
        formData.append("file", file);
        const response = await axios.post(`${API_BASE}/api/ingest`, formData, {
          withCredentials: true,
        });
        return response.data;
      }
    },
    onSuccess: (data) => {
      setStage(2);
      setOutput(JSON.parse(data.message));
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data), setStage(1);
    },
  });

  useEffect(() => {
    if (
      (!user && !isPending) ||
      (user && user.role !== "editor" && user.role !== "admin")
    ) {
      navigate("/not-authorized");
    }
  }, [user]);

  // function handleFileChange(e: any) {

  // }

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded w-[800px] p-4">
        <div className="flex gap-4 items-center mb-4">
          <h1 className="text-2xl">Ingester</h1>
          <div>
            <button
              type="button"
              className="border rounded px-2 py-1 bg-red-500 text-white"
              onClick={() => {
                setFile(null);
                setErrorMessage(null);
                setOutput(null);
                setSource("");
                setStage(1);
              }}
            >
              Reset
            </button>
          </div>
        </div>
        {errorMessage ? (
          <div className="text-red-500">{errorMessage}</div>
        ) : null}
        <div className="flex justify-center">
          {stage === 0 ? <DefaultLoader /> : null}
          {stage === 1 ? (
            <div className="flex flex-col gap-2">
              <span>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
              </span>
              {/* <div className="flex justify-center"> */}
              <button
                type="button"
                disabled={!file}
                className="border p-2 rounded bg-blue-400 text-white disabled:bg-gray-200"
                onClick={() => uploadFile.mutate()}
              >
                Upload
              </button>
              {/* </div> */}
            </div>
          ) : null}
          {stage === 2 ? (
            <div className="flex flex-col w-full">
              <div className="mb-2">
                <div>Source</div>
                <Input
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
              {collectionsConfig.map((c) => (
                <div>
                  <h2 className="text-xl">{c.display}</h2>
                  <AutosizeTextarea
                    value={JSON.stringify(output[c.name], undefined, 4)}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Ingester;
