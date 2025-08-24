import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getUserData } from '../utils';

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params;
  const { user_id, resume, supabaseUser } = await getUserData(username);

  if (!user_id || !resume || !resume.resumeData) {
    return notFound();
  }

  // For public profile pages, supabaseUser is null, so no profile image from auth
  const profileImageUrl = undefined;
  const name = resume.resumeData.header.name;
  const shortAbout = resume.resumeData.header.shortAbout;
  const location = resume.resumeData.header.location;

  const skills = resume.resumeData.header.skills?.slice(0, 3).join(' • ') || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e293b',
          color: 'white',
          fontFamily: 'Inter',
        }}
      >
        {/* Profile Image */}
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt={name}
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              marginBottom: 24,
              border: '4px solid #3b82f6',
            }}
          />
        )}
        
        {/* Name */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          {name}
        </h1>
        
        {/* Short About */}
        {shortAbout && (
          <p
            style={{
              fontSize: 24,
              marginBottom: 16,
              textAlign: 'center',
              color: '#94a3b8',
            }}
          >
            {shortAbout}
          </p>
        )}
        
        {/* Skills */}
        {skills && (
          <p
            style={{
              fontSize: 18,
              color: '#3b82f6',
              textAlign: 'center',
            }}
          >
            {skills}
          </p>
        )}
        
        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 16,
            color: '#64748b',
          }}
        >
          self.so/{username}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
