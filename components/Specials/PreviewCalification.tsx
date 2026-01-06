import { IconArticle } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { InputGroup, InputGroupAddon, InputGroupText } from "../ui/input-group";

type Props = {
  value: string;
};

export function PreviewCalification({ value }: Props) {
  return (
    <div className="w-full">
      <InputGroup className="max-h-[280px]">
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            <IconArticle />
            Correcciones
          </InputGroupText>
        </InputGroupAddon>
        <div className="overflow-auto prose w-[95%] p-2 min-h-[200px] my-0">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {value}
          </ReactMarkdown>
        </div>
      </InputGroup>
    </div>
  );
}
