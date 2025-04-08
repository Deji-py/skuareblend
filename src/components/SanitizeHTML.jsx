import DOMPurify from "dompurify";
import React from "react";

function SanitizedHTML({ htmlString }) {
  const sanitizedHTML = DOMPurify.sanitize(htmlString);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}

export default SanitizedHTML;
