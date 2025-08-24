import { NextRequest } from 'next/server';

// File upload validation with enhanced security
export function validateFileUpload(request: NextRequest, allowedTypes: string[] = []) {
  const contentLength = request.headers.get('content-length');
  const contentType = request.headers.get('content-type');
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  // Check file size
  if (contentLength && parseInt(contentLength) > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 5MB.' };
  }
  
  // Check content type
  if (allowedTypes.length > 0 && (!contentType || !allowedTypes.includes(contentType))) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  return { valid: true };
}

// Image-specific validation
export function validateImageUpload(request: NextRequest) {
  const allowedImageTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif'
  ];
  
  return validateFileUpload(request, allowedImageTypes);
}

// File content validation (magic number check)
export async function validateFileContent(buffer: ArrayBuffer, expectedType: string): Promise<{ valid: boolean; error?: string }> {
  const uint8Array = new Uint8Array(buffer.slice(0, 12));
  
  // Magic number signatures for common image types
  const signatures = {
    'image/jpeg': [0xFF, 0xD8, 0xFF],
    'image/png': [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
    'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF (WebP starts with RIFF)
    'image/gif': [0x47, 0x49, 0x46], // GIF
  };
  
  const signature = signatures[expectedType as keyof typeof signatures];
  if (!signature) {
    return { valid: true }; // Skip validation for unknown types
  }
  
  const matches = signature.every((byte, index) => uint8Array[index] === byte);
  
  if (!matches) {
    return { 
      valid: false, 
      error: 'File content does not match the declared file type.' 
    };
  }
  
  return { valid: true };
}

// Username validation with XSS prevention
export function validateUsername(username: string): 
  | { valid: true; sanitized: string; error?: undefined }
  | { valid: false; error: string; sanitized?: undefined } {
  // Sanitize input
  const sanitized = username.trim().replace(/[<>"'&]/g, '');
  
  if (sanitized !== username) {
    return { 
      valid: false, 
      error: 'Username contains invalid characters.' 
    };
  }
  
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  
  if (!usernameRegex.test(sanitized)) {
    return { 
      valid: false, 
      error: 'Username must be 3-20 characters and contain only letters, numbers, hyphens, and underscores.' 
    };
  }
  
  return { valid: true, sanitized, error: undefined };
}

// General input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>"'&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    })
    .trim();
}

// Validate and sanitize resume data
export function validateResumeData(data: any) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid resume data format.' };
  }
  
  // Recursively sanitize string values
  function sanitizeObject(obj: any): any {
    if (typeof obj === 'string') {
      return sanitizeInput(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitizeObject(value);
      }
      return sanitized;
    }
    
    return obj;
  }
  
  return { valid: true, sanitized: sanitizeObject(data) };
}