import { ResumeData } from '../../../lib/server/redisActions';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { useState, useEffect } from 'react';
import { AddButton } from './AddButton';
import { WorkExperienceField } from './WorkExperienceField';
import { EducationField } from './EducationField';
import { SkillField } from './SkillField';
import { AddSkillDialog } from './AddSkillDialog';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import { SocialLinksEditor } from './SocialLinksEditor';
import { SectionManager } from './SectionManager';
import { ProjectField } from './ProjectField';
import { CertificationField } from './CertificationField';
import { LanguageField } from './LanguageField';
import { ThemeSelector } from './ThemeSelector';

export const EditResume = ({
  resume,
  onChangeResume,
}: {
  resume: ResumeData;
  onChangeResume: (newResume: ResumeData) => void;
}) => {
  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false);
  
  const handleProfilePictureUpdate = (imageUrl: string | null) => {
    onChangeResume({
      ...resume,
      profilePicture: imageUrl || undefined,
    });
  };

  const handleAddSkill = (skill: string) => {
    onChangeResume({
      ...resume,
      header: {
        ...resume.header,
        skills: [...resume.header.skills, skill],
      },
    });
    setIsAddSkillDialogOpen(false);
  };

  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-8 bg-white my-8"
      aria-label="Resume Content editing"
    >
      <Accordion type="multiple" defaultValue={["header", "about", "work-experience", "education", "skills"]} className="w-full space-y-4">
                {/* Theme Selection */}
        <AccordionItem value="theme" className="border rounded-lg px-4">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            Theme Selection
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <ThemeSelector
              currentTheme={resume?.theme || 'default'}
              onThemeChange={(theme) => {
                onChangeResume({
                  ...resume,
                  theme,
                });
              }}
            />
          </AccordionContent>
        </AccordionItem>
        
        {/* Section Visibility Manager */}
        <AccordionItem value="section-visibility" className="border rounded-lg px-4">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            Section Visibility Manager
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <SectionManager
              sectionVisibility={resume.sectionVisibility || {
                summary: true,
                workExperience: true,
                education: true,
                skills: true,
                projects: false,
                certifications: false,
                languages: false,
                cvfolioBadge: true,
              }}
              onVisibilityChange={(section, visible) => {
                const currentVisibility = resume.sectionVisibility || {
                  summary: true,
                  workExperience: true,
                  education: true,
                  skills: true,
                  projects: false,
                  certifications: false,
                  languages: false,
                  cvfolioBadge: true,
                };
                onChangeResume({
                  ...resume,
                  sectionVisibility: {
                    ...currentVisibility,
                    [section]: visible,
                  },
                });
              }}
            />
          </AccordionContent>
        </AccordionItem>
        
        {/* Header Section */}
        <AccordionItem value="header" className="border rounded-lg px-4">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            Header
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="flex flex-col gap-6">
              {/* Profile Picture Upload */}
              <ProfilePictureUpload
                currentImageUrl={resume?.profilePicture}
                userName={resume?.header?.name || 'User'}
                onImageUpdate={handleProfilePictureUpdate}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    value={resume?.header?.name || ''}
                    onChange={(e) => {
                      onChangeResume({
                        ...resume,
                        header: {
                          ...resume.header,
                          name: e.target.value,
                        },
                      });
                    }}
                    placeholder="Your full name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium text-gray-700"
                  >
                    Location
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    value={resume?.header?.location || ''}
                    onChange={(e) => {
                      onChangeResume({
                        ...resume,
                        header: {
                          ...resume.header,
                          location: e.target.value,
                        },
                      });
                    }}
                    placeholder="Your location"
                  />
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                  <Label
                    htmlFor="shortAbout"
                    className="text-sm font-medium text-gray-700"
                  >
                    Short About
                  </Label>
                  <textarea
                    className="w-full p-2 border rounded-md font-mono text-sm"
                    value={resume?.header?.shortAbout || ''}
                    onChange={(e) => {
                      onChangeResume({
                        ...resume,
                        header: {
                          ...resume.header,
                          shortAbout: e.target.value,
                        },
                      });
                    }}
                    rows={4}
                    placeholder="Brief description about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={resume?.header?.contacts?.email || ''}
                      onChange={(e) => {
                        onChangeResume({
                          ...resume,
                          header: {
                            ...resume.header,
                            contacts: {
                              ...resume.header.contacts,
                              email: e.target.value,
                            },
                          },
                        });
                      }}
                      placeholder="Your email address"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      value={resume?.header?.contacts?.phone || ''}
                      onChange={(e) => {
                        onChangeResume({
                          ...resume,
                          header: {
                            ...resume.header,
                            contacts: {
                              ...resume.header.contacts,
                              phone: e.target.value,
                            },
                          },
                        });
                      }}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                  <SocialLinksEditor
                    contacts={resume?.header?.contacts || {}}
                    onUpdate={(newContacts) => {
                      onChangeResume({
                        ...resume,
                        header: {
                          ...resume.header,
                          contacts: newContacts,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* About Section */}
        <AccordionItem value="about" className="border rounded-lg px-4">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            About
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="space-y-2">
              <textarea
                className="w-full p-2 border rounded-md font-mono text-sm"
                value={resume?.summary}
                onChange={(e) => {
                  onChangeResume({
                    ...resume,
                    summary: e.target.value,
                  });
                }}
                rows={4}
                placeholder="Enter your professional summary..."
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Work Experience Section */}
        <AccordionItem value="work-experience" className="border rounded-lg px-4">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            Work Experience
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="space-y-4">
              {resume?.workExperience?.map((work, index) => (
                <WorkExperienceField
                  key={index}
                  work={work}
                  index={index}
                  onUpdate={(index, updatedWork) => {
                    const newWorkExperience = [...resume.workExperience];
                    newWorkExperience[index] = updatedWork;
                    onChangeResume({
                      ...resume,
                      workExperience: newWorkExperience,
                    });
                  }}
                  onDelete={(index) => {
                    const newWorkExperience = [...resume.workExperience];
                    newWorkExperience.splice(index, 1);
                    onChangeResume({
                      ...resume,
                      workExperience: newWorkExperience,
                    });
                  }}
                />
              ))}
              <AddButton
                label="Add Work Experience"
                onClick={() => {
                  onChangeResume({
                    ...resume,
                    workExperience: [
                      ...resume.workExperience,
                      {
                        title: '',
                        company: '',
                        description: '',
                        location: '',
                        link: '',
                        contract: '',
                        start: '',
                      },
                    ],
                  });
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Education Section */}
        <AccordionItem value="education" className="border rounded-lg px-4">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            Education
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="space-y-4">
              {resume?.education?.map((edu, index) => (
                <EducationField
                  key={index}
                  edu={edu}
                  index={index}
                  onUpdate={(index, updatedEdu) => {
                    const newEducation = [...resume.education];
                    newEducation[index] = updatedEdu;
                    onChangeResume({
                      ...resume,
                      education: newEducation,
                    });
                  }}
                  onDelete={(index) => {
                    const newEducation = [...resume.education];
                    newEducation.splice(index, 1);
                    onChangeResume({
                      ...resume,
                      education: newEducation,
                    });
                  }}
                />
              ))}
              <AddButton
                label="Add Education"
                onClick={() => {
                  onChangeResume({
                    ...resume,
                    education: [
                      ...resume.education,
                      { degree: '', school: '', start: '', end: '' },
                    ],
                  });
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Skills Section */}
        <AccordionItem value="skills" className="border rounded-lg px-4">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            Skills
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {resume.header.skills.map((skill, index) => (
                  <SkillField
                    key={index}
                    skill={skill}
                    index={index}
                    onUpdate={(index, updatedSkill) => {
                      const newSkills = [...resume.header.skills];
                      newSkills[index] = updatedSkill;
                      onChangeResume({
                        ...resume,
                        header: {
                          ...resume.header,
                          skills: newSkills,
                        },
                      });
                    }}
                    onDelete={(index) => {
                      const newSkills = [...resume.header.skills];
                      newSkills.splice(index, 1);
                      onChangeResume({
                        ...resume,
                        header: {
                          ...resume.header,
                          skills: newSkills,
                        },
                      });
                    }}
                  />
                ))}
              </div>
              <AddButton
                label="Add Skill"
                onClick={() => setIsAddSkillDialogOpen(true)}
              />
              <AddSkillDialog
                open={isAddSkillDialogOpen}
                onOpenChange={setIsAddSkillDialogOpen}
                onAddSkill={handleAddSkill}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

  
        
        {/* Certifications Section */}
        {(resume.sectionVisibility?.certifications) && (
          <AccordionItem value="certifications" className="border rounded-lg px-4">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              Certifications
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <div className="space-y-4">
                {(resume?.certifications || []).map((certification, index) => (
                  <CertificationField
                    key={index}
                    certification={certification}
                    index={index}
                    onUpdate={(index, updatedCertification) => {
                      const newCertifications = [...(resume.certifications || [])];
                      newCertifications[index] = updatedCertification;
                      onChangeResume({
                        ...resume,
                        certifications: newCertifications,
                      });
                    }}
                    onDelete={(index) => {
                      const newCertifications = [...(resume.certifications || [])];
                      newCertifications.splice(index, 1);
                      onChangeResume({
                        ...resume,
                        certifications: newCertifications,
                      });
                    }}
                  />
                ))}
                <AddButton
                  label="Add Certification"
                  onClick={() => {
                    onChangeResume({
                      ...resume,
                      certifications: [
                        ...(resume.certifications || []),
                        {
                          name: '',
                          issuer: '',
                          date: '',
                          link: '',
                        },
                      ],
                    });
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Languages Section */}
        {(resume.sectionVisibility?.languages) && (
          <AccordionItem value="languages" className="border rounded-lg px-4">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              Languages
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <div className="space-y-4">
                {(resume?.languages || []).map((language, index) => (
                  <LanguageField
                    key={index}
                    language={language}
                    index={index}
                    onUpdate={(index, updatedLanguage) => {
                      const newLanguages = [...(resume.languages || [])];
                      newLanguages[index] = updatedLanguage;
                      onChangeResume({
                        ...resume,
                        languages: newLanguages,
                      });
                    }}
                    onDelete={(index) => {
                      const newLanguages = [...(resume.languages || [])];
                      newLanguages.splice(index, 1);
                      onChangeResume({
                        ...resume,
                        languages: newLanguages,
                      });
                    }}
                  />
                ))}
                <AddButton
                  label="Add Language"
                  onClick={() => {
                    onChangeResume({
                      ...resume,
                      languages: [
                        ...(resume.languages || []),
                        {
                          language: '',
                          proficiency: 'Beginner',
                        },
                      ],
                    });
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      {/* Projects Section */}
        {(resume.sectionVisibility?.projects) && (
          <AccordionItem value="projects" className="border rounded-lg px-4">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              Projects
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <div className="space-y-4">
                {(resume?.projects || []).map((project, index) => (
                  <ProjectField
                    key={index}
                    project={project}
                    index={index}
                    onUpdate={(index, updatedProject) => {
                      const newProjects = [...(resume.projects || [])];
                      newProjects[index] = updatedProject;
                      onChangeResume({
                        ...resume,
                        projects: newProjects,
                      });
                    }}
                    onDelete={(index) => {
                      const newProjects = [...(resume.projects || [])];
                      newProjects.splice(index, 1);
                      onChangeResume({
                        ...resume,
                        projects: newProjects,
                      });
                    }}
                  />
                ))}
                <AddButton
                  label="Add Project"
                  onClick={() => {
                    onChangeResume({
                      ...resume,
                      projects: [
                        ...(resume.projects || []),
                        {
                          name: '',
                          description: '',
                          technologies: [],
                          link: '',
                          github: '',
                          start: '',
                          end: '',
                        },
                      ],
                    });
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

      </Accordion>
    </section>
  );
};