import { pdfToText } from 'pdf-ts';

export async function scrapePdfContent(pdfUrl: string) {
  try {
    const pdfFetch = await fetch(pdfUrl);
    
    if (!pdfFetch.ok) {
      throw new Error(`Failed to fetch PDF: ${pdfFetch.status} ${pdfFetch.statusText}`);
    }
    
    const pdf = await pdfFetch.arrayBuffer();
    const text = await pdfToText(new Uint8Array(pdf));
    
    return text;
  } catch (error) {
    console.error('❌ [PDF Scraping] Error during PDF processing:', error);
    console.error('❌ [PDF Scraping] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      url: pdfUrl
    });
    throw error;
  }
}
