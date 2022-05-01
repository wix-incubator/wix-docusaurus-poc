import { DocsUrl, Portal } from '@wix/ambassador-apis-docs-v2-portal/types';
import {
  ApiDoc,
  Type as ApiDocType,
} from '@wix/ambassador-apis-docs-v1-apidoc/types';
import { OpenApiTypes } from '@wix/autodocs';

interface DocsPortalConfig {
  clientTopology: any;
}

interface DocsPortal extends Portal {
  portalMenu: PortalMenu;
  relatedPortals: RelatedPortal[];
}

interface RelatedPortal {
  name: string;
  docsUrl: DocsUrl;
}

interface PortalMenu {
  sections: Section[];
}

type MenuNodeType = 'SECTION' | 'NODE';

interface Section {
  id: string;
  translationKey: string;
  name: string;
  items?: MenuNode[];
  type?: MenuNodeType;
}

interface MenuNode {
  id: string;
  displayName: string;
  slugifyName: string;
  sectionId?: string;
  parentNodeId?: string;
  afterNodeId?: string;
  visibility?: boolean;
  apiDocId?: string;
  link?: string;
  children?: MenuNode[];
  type?: MenuNodeType;
}

type OpenAPIObject = OpenApiTypes.OpenAPIObject;

interface ApiDocOpenAPI extends ApiDoc {
  docsSchema: OpenAPIObject;
}

interface ApiDocGuide extends ApiDoc {
  docsSchema: Guide;
}

interface ApiDocMap {
  [key: string]: ApiDoc;
}

interface Guide {
  title: string;
  content: string;
}

interface DocsContentLink {
  displayName: string;
  slugifyName: string;
}

type HttpMethod = keyof typeof OpenApiTypes.HttpMethods;

enum MediaTypes {
  APPLICATION_JSON = 'application/json',
}

enum Responses {
  OK = '200',
}

type DocsWebhookObject = OpenApiTypes.Webhook & { contentLink: DocsContentLink };

interface DocsArticleObject extends OpenApiTypes.MdFile {
  contentLink: DocsContentLink;
}

interface DocsOperationObject extends OpenApiTypes.OperationObject {
  contentLink: DocsContentLink;
  path?: string;
  httpMethod?: HttpMethod;
  rpcOnly: boolean;
}

interface PrimitiveType {
  type: string;
  typeDisplayName?: string;
}

interface ReferenceType extends PrimitiveType {
  $ref?: string;
}

interface ArrayOfPrimitiveType extends PrimitiveType {
  arrayOf: string;
}

interface ArrayOfReferenceType extends ReferenceType {
  arrayOf: string;
}

type TypeDetails =
  | PrimitiveType
  | ReferenceType
  | ArrayOfPrimitiveType
  | ArrayOfReferenceType;

interface Param {
  name: string;
  typeDetails?: TypeDetails;
  description: string;
  params?: Param[];
  isOneOf?: boolean;
  required?: boolean;
  readOnly?: boolean;
  optional?: boolean;
  deprecated?: boolean;
}

enum TableTypes {
  'REQUEST' = 'request',
  'RESPONSE' = 'response',
  'ENTITY' = 'entity',
}

export {
  OpenAPIObject,
  DocsPortalConfig,
  RelatedPortal,
  PortalMenu,
  Section,
  MenuNode,
  DocsPortal,
  ApiDocOpenAPI,
  ApiDocGuide,
  ApiDocType,
  ApiDocMap,
  Guide,
  DocsOperationObject,
  DocsContentLink,
  HttpMethod,
  MediaTypes,
  Param,
  Responses,
  PrimitiveType,
  ReferenceType,
  TypeDetails,
  ArrayOfReferenceType,
  ArrayOfPrimitiveType,
  TableTypes,
  DocsArticleObject,
  DocsWebhookObject,
};
