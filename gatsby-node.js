"use strict";

// The upstream repo adds types that are incorrect,
// so this allows us to work around that
exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type BrainNote implements Node @infer {
      title: String!
      slug: String!
      rawContent: String
      content: String
      noteTemplate: String
      aliases: [String]
      outboundReferences: [String]
      outboundReferenceNotes: [BrainNote] @link(from: "outboundReferenceNotes___NODE")
      inboundReferences: [String]
      inboundReferenceNotes: [BrainNote] @link(from: "inboundReferenceNotes___NODE")
      inboundReferencePreviews: [InboundReferencePreview]
      inboundReferencePreview: [InboundReferencePreview]
      externalInboundReferences: [ExternalInboundReference]
      externalOutboundReferences: [ExternalOutboundReference]
      childMdx: Mdx
    }
    type ExternalInboundReference {
      siteName: String!
      sourcePage: String!
      sourceUrl: String!
      previewHtml: String!
    }
    type ExternalOutboundReference {
      targetSite: String!
      targetPage: String!
      previewHtml: String!
    }
    type InboundReferencePreview @infer {
      source: String!
      previewHtml: String!
    }
  `;

  createTypes(typeDefs);
};
exports.createPages = require("./gatsby/create-pages");
exports.onCreateNode = require("./gatsby/on-create-node");
