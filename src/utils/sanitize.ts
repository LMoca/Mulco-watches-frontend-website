const SQL_PATTERNS = /('|"|--|#|\/\*|\*\/|;|@@|UNION\s+SELECT|OR\s+1\s*=\s*1|AND\s+1\s*=\s*1)/gi;

const XSS_PATTERNS = /<script[\s>]|<\/script>|onerror\s*=|onload\s*=|onclick\s*=|javascript:/gi;

const COMMAND_PATTERNS = /(\$\(|\$\{|`|&&|\|\||>>|<<)/g;

const TEMPLATE_PATTERNS = /(\{\{|\}\}|\{%|%\}|\$\{)/g;

const XML_PATTERNS = /(<!DOCTYPE|<!ENTITY|SYSTEM\s+"|PUBLIC\s+")/gi;

export function sanitizeInput(input: string): string {
  if (!input) return '';

  let sanitized = input;

  sanitized = sanitized.replace(/[<>]/g, '');

  sanitized = sanitized.replace(SQL_PATTERNS, '');
  sanitized = sanitized.replace(XSS_PATTERNS, '');
  sanitized = sanitized.replace(COMMAND_PATTERNS, '');
  sanitized = sanitized.replace(TEMPLATE_PATTERNS, '');
  sanitized = sanitized.replace(XML_PATTERNS, '');

  return sanitized.trim();
}

export function sanitizeEmail(input: string): string {
  if (!input) return '';

  const sanitized = input.replace(/[^a-zA-Z0-9@._+\-]/g, '');
  return sanitized.trim();
}
