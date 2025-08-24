'use client';

import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';

interface ProfilePictureUploadProps {
  currentImageUrl?: string;
  userName: string;
  onImageUpdate: (imageUrl: string | null) => void;
}

export const ProfilePictureUpload = ({
  currentImageUrl,
  userName,
  onImageUpdate,
}: ProfilePictureUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a JPEG, PNG, or WebP image');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload to API
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/profile-picture?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();
      
      // Clean up object URL
      URL.revokeObjectURL(objectUrl);
      
      // Update with actual URL
      setPreviewUrl(result.url);
      onImageUpdate(result.url);
      
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    try {
      // Update user metadata to remove avatar
      const { error } = await supabase.auth.updateUser({
        data: {
          avatar_url: null
        }
      });

      if (error) {
        throw error;
      }

      setPreviewUrl(null);
      onImageUpdate(null);
      toast.success('Profile picture removed');
    } catch (error) {
      console.error('Remove error:', error);
      toast.error('Failed to remove profile picture');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <Label className="text-sm font-medium text-gray-700">
        Profile Picture
      </Label>
      
      <div className="flex items-center gap-4">
        {/* Avatar Preview */}
        <div className="relative">
          <Avatar className="size-20 border-2 border-gray-200">
            <AvatarImage src={previewUrl || undefined} alt={`${userName}'s profile picture`} />
            <AvatarFallback className="text-lg">
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {/* Remove button */}
          {previewUrl && (
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
              disabled={isUploading}
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                {previewUrl ? 'Change Photo' : 'Add Photo'}
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500">
            JPEG, PNG, WebP, or GIF • Max 5MB
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};