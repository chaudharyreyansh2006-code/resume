import { pdfToText } from 'pdf-ts';

export async function scrapePdfContent(pdfUrl: string) {
  console.log('🔍 [PDF Scraping] Starting PDF content extraction from URL:', pdfUrl);
  
  try {
    console.log('🔍 [PDF Scraping] Fetching PDF from URL...');
    const pdfFetch = await fetch(pdfUrl);
    
    if (!pdfFetch.ok) {
      console.error('❌ [PDF Scraping] Failed to fetch PDF:', {
        status: pdfFetch.status,
        statusText: pdfFetch.statusText,
        url: pdfUrl
      });
      throw new Error(`Failed to fetch PDF: ${pdfFetch.status} ${pdfFetch.statusText}`);
    }
    
    console.log('✅ [PDF Scraping] PDF fetched successfully, converting to array buffer...');
    const pdf = await pdfFetch.arrayBuffer();
    console.log('🔍 [PDF Scraping] PDF buffer size:', pdf.byteLength, 'bytes');
    
    console.log('🔍 [PDF Scraping] Converting PDF to text...');
    const text = await pdfToText(new Uint8Array(pdf));
    console.log('✅ [PDF Scraping] PDF text extraction completed:', {
      textLength: text.length,
      textPreview: text.substring(0, 200) + '...'
    });
    
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
