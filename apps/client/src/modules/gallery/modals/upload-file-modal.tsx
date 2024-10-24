import { Suspense, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dropzone } from '@/components/ui/dropzone';
import { Button } from "@/components/ui/button";
import { useUploadFile } from '../mutations';
import { Progress } from "@/components/ui/progress"

interface UploadFileFormProps {
  creatorId: string;
}

const UploadFileForm = ({ creatorId }: UploadFileFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'photo' | 'video'>('photo');
  const [progress, setProgress] = useState(0);
  const { mutate, isPending } = useUploadFile((ev) => {
    console.log(ev);
    setProgress(progress || 0);
  });

  const handleSave = () => {
    if (!file) {
      return;
    }
    mutate({ creatorId, file, fileType });
  }

  const [preview, setPreview] = useState<string | null>(null);

  const generatePreview = async (currentFile: File) => {
    if (fileType === 'photo') {
      return setPreview(URL.createObjectURL(currentFile));
    }

    const video = document.createElement('video');
    video.muted = true;

    video.src = URL.createObjectURL(currentFile);
    await video.play();

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

    video.pause();

    setPreview(canvas.toDataURL());
  }

  const createThumb = () => {
    return preview || '';
  };

  return (
    <DialogHeader>
      <DialogTitle>Fazer Upload</DialogTitle>
      <DialogDescription className='pt-6'>
        <RadioGroup
          defaultValue="photo"
          className="flex flex-row items-center mb-4 gap-4"
          value={fileType}
          onValueChange={(e: 'video' | 'photo') => setFileType(e)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="photo" id="photo" />
            <Label htmlFor="photo">Foto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video">Vídeo</Label>
          </div>
        </RadioGroup>
        
        {isPending ? (
          <Progress value={progress} />
        ) : (
          <Dropzone
            onConfirm={([fileItem]) => {
              setFile(fileItem);
              generatePreview(fileItem);
            }}
            validExtensions={
              fileType === 'photo'
                ? ['.jpg', '.jpeg', '.png', '.gif']
                : ['.mp4']
            }
            currentFile={file || null}
            createThumb={createThumb}
          />
        )}

        <div className="flex flex-row items-center justify-center mt-4">
          <Button
            type="button"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  );
}

export const UploadFileModal = () => {
  const [params] = useSearchParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const isOpen = params.get('dialog') === 'upload';
  const id = params.get('id') || '';

  const handleClose = () => {
    if (!state?.prevLocation) {
      return navigate('/dashboard/gallery');
    }
    return navigate(state.prevLocation);
  }

  const handleOpenChange = (value: boolean) => {
    if (value) {
      return;
    }
    return handleClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <Suspense fallback={"Carregando..."}>
          <UploadFileForm creatorId={id} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
