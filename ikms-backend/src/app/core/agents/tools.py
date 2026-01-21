"""Tools available to agents in the multi-agent RAG system."""

from langchain_core.tools import tool

from ..retrieval.vector_store import retrieve
from ..retrieval.serialization import serialize_chunks_with_ids


@tool(response_format="content_and_artifact")
def retrieval_tool(query: str):
    """Search the vector database for relevant document chunks.

    This tool retrieves the top 4 most relevant chunks from the Pinecone
    vector store based on the query. The chunks are formatted with page
    numbers and indices for easy reference.

    Args:
        query: The search query string to find relevant document chunks.

    Returns:
        Tuple of (serialized_content, artifact) where:
        - serialized_content: A Tuple containing formatted string containing the retrieved chunks and citatation map.
          with metadata. Format: "Chunk 1 (page=X): ...\n\nChunk 2 (page=Y): ..."
        - artifact: List of Document objects with full metadata for reference
    """
    # Retrieve documents from vector store
    docs = retrieve(query, k=4)

    # Serialize chunks into a tuple of formatted string (content) and citation map
    context = serialize_chunks_with_ids(docs)
    
    # Return tuple: (serialized content, artifact documents)
    # This follows LangChain's content_and_artifact response format
    return context, docs