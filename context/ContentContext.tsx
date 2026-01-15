import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Skill, Photo, Profile } from '../types';
import { PROJECTS as DEFAULT_PROJECTS, SKILLS as DEFAULT_SKILLS, PHOTOS as DEFAULT_PHOTOS, PROFILE as DEFAULT_PROFILE } from '../constants';
import { api } from '../services/api';

interface ContentContextType {
  projects: Project[];
  skills: Skill[];
  photos: Photo[];
  profile: Profile;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [photos, setPhotos] = useState<Photo[]>(DEFAULT_PHOTOS);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from API on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await api.getContent();
      
      if (data) {
        if (data.projects) setProjects(data.projects);
        if (data.skills) setSkills(data.skills);
        if (data.photos) setPhotos(data.photos);
        if (data.profile) setProfile(data.profile);
      }
      // If data is null (API failure or not configured), we stay with Defaults
      
      setIsLoaded(true);
    };

    loadData();
  }, []);

  if (!isLoaded) return null;

  return (
    <ContentContext.Provider value={{
      projects,
      skills,
      photos,
      profile,
      isLoading: !isLoaded,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};