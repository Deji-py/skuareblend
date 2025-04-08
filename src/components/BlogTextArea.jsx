import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editorstyle.css";
import { Editor as DraftEditor } from "react-draft-wysiwyg";

function BlogTextArea({ setState, state }) {
  const customToolbar = {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "list",
      "textAlign",
      "link",
      "emoji",
      "image",
      "history", // add this line to show undo and redo buttons in toolbar
      //   "textsize",

      "colorPicker", //add color picker button
    ],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough", "monospace"],
    },
  };

  const editorStyle = {
    border: "1px solid #ccc",
    borderRadius: 10,
    height: "300px",
    padding: "10px",
  };

  const handleEditorChange = (newEditorState) => {
    setState(newEditorState);
  };

  return (
    <form className="  my-10 h-full overflow-hidden">
      <DraftEditor
        editorState={state}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="editor-wrapper"
        editorClassName="editor-content"
        toolbarClassName="custom-toolbar" // Apply the custom toolbar class
        toolbar={customToolbar}
        editorStyle={editorStyle}
        placeholder="Article here..."
      />
    </form>
  );
}

export default BlogTextArea;
