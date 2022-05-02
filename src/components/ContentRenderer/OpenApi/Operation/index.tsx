import React, { useEffect, useState } from 'react';
import s from './Operation.module.scss';
import { DocsOperationObject } from '../../../../types';
import axios from 'axios';
import MetadataBox from '../../../MetadataBox';
import RpcRestSyntax from './RpcRestSyntax';
import { OpenApiContentProvider } from '../../../../Context/OpenAPIContentContext';
import WasItHelpful from '../../../WasItHelpful';
import Examples from '../../../Examples';
import DocsMarkdownDisplay from '../../../DocsMarkdownDisplay';
import OperationTables from './OperationTables';

interface OperationProps {
  operation: DocsOperationObject;
  source: string;
  operationId: string;
}

export default function Operation({ source, operationId }: OperationProps) {
  const exampleContent = [
    { title: 'example 1', description, examples },
    { title: 'example 2', examples },
    { title: 'example 3', examples: [{ markdown }] },
  ];

  const [openApi, setOpenApi] = useState<any>();
  const [operation, setOperation] = useState<any>();

  useEffect(() => {
    axios.post(`http://localhost:8080/api/get-operation`,
      { source, operationId }
    ).then(({ data }) => {
      console.log({ data })
      setOpenApi(data.schema)
      setOperation(data.operation)
    })
  }, [])

  return operation ? (
      <OpenApiContentProvider>
        {/* <Divider id={operation?.contentLink.slugifyName} /> */}
        <div
          data-hook={`operation-${operation?.contentLink?.slugifyName}`}
          id={operation?.contentLink.slugifyName}
          className={s.operation}
        >
          <div data-hook="operation-content" className={s.operationContent}>
            {/* <div>
            <Heading size="h2">{operation.summary}</Heading>
          </div> */}
            {operation.description && (
              <DocsMarkdownDisplay markdown={operation.description!} />
            )}
            {/* TODO: Pass relevant metadata */}
            <MetadataBox
              infoMap={{
                Artifact: 'com.wix.ecom.orders',
                Service: 'OrdersService',
              }}
            />
            <RpcRestSyntax operation={operation} servers={openApi.servers} />
            <OperationTables operation={operation} components={openApi.components} />
            <WasItHelpful />
          </div>
          <div className={s.operationExamples}>
            {/* TODO: pass relevant examples from OpenAPI */}
            <Examples
              examplesContent={exampleContent}
            />
          </div>
        </div>
      </OpenApiContentProvider>
  ) : <div>Loading Operation...</div>
}

const markdown = `~~~typescript
import {something} from 'some-other-thing';

// comment
(function someDemo(a: string, b: number, [options: RegistrationOptions]): Promise<RegistrationResult> {
  var test = "Hello World!";
  console.log(test);
})();
~~~`;

const description = `
here is some description 123123123123123123
gavno and yaytzo

here is a paragraph
`;

const examples = [{ markdown, title: 'something 1' }, { markdown }];

// /*
//   We use React.memo in order to avoid redundant rerenders,
//   we will render the following only the props was changed.
// */
// export default React.memo(Operation, (prevProps, nextProps) =>
//   isEqual(prevProps, nextProps),
// );
