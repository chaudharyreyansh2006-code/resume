import React from 'react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { ResumeDataSchemaType } from '@/lib/resume';

type Certification = ResumeDataSchemaType['certifications'][0];

interface CertificationFieldProps {
  certification: Certification;
  index: number;
  onUpdate: (index: number, updatedCertification: Certification) => void;
  onDelete: (index: number) => void;
}

export const CertificationField: React.FC<CertificationFieldProps> = ({
  certification,
  index,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="relative p-4 border rounded-md group">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
        onClick={() => onDelete(index)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`cert-name-${index}`} className="text-sm font-medium text-gray-700">
            Certification Name
          </Label>
          <Input
            type="text"
            id={`cert-name-${index}`}
            value={certification.name}
            onChange={(e) => {
              onUpdate(index, {
                ...certification,
                name: e.target.value,
              });
            }}
            placeholder="Certification name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`cert-issuer-${index}`} className="text-sm font-medium text-gray-700">
            Issuing Organization
          </Label>
          <Input
            type="text"
            id={`cert-issuer-${index}`}
            value={certification.issuer}
            onChange={(e) => {
              onUpdate(index, {
                ...certification,
                issuer: e.target.value,
              });
            }}
            placeholder="Issuing organization"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`cert-date-${index}`} className="text-sm font-medium text-gray-700">
            Date Obtained
          </Label>
          <Input
            type="date"
            id={`cert-date-${index}`}
            value={certification.date}
            onChange={(e) => {
              onUpdate(index, {
                ...certification,
                date: e.target.value,
              });
            }}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`cert-link-${index}`} className="text-sm font-medium text-gray-700">
            Certification URL
          </Label>
          <Input
            type="url"
            id={`cert-link-${index}`}
            value={certification.link || ''}
            onChange={(e) => {
              onUpdate(index, {
                ...certification,
                link: e.target.value,
              });
            }}
            placeholder="https://certification-url.com"
          />
        </div>
      </div>
    </div>
  );
};