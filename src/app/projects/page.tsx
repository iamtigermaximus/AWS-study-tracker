// "use client";

// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import {
//   FolderGit2,
//   ExternalLink,
//   CheckCircle,
//   Clock,
//   PlayCircle,
// } from "lucide-react";

// interface Project {
//   id: string;
//   name: string;
//   description: string;
//   status: string;
//   liveUrl: string | null;
//   githubUrl: string | null;
//   awsServices: string[];
//   deployedAt?: string;
// }

// const Container = styled.div`
//   max-width: 1280px;
//   margin: 0 auto;
//   padding: 1.5rem 1rem;

//   @media (min-width: 640px) {
//     padding: 1.5rem 1.5rem;
//   }

//   @media (min-width: 1024px) {
//     padding: 1.5rem 2rem;
//   }
// `;

// const Title = styled.h1`
//   font-size: 1.875rem;
//   font-weight: 700;
//   color: #1f2937;
//   margin-bottom: 0.25rem;

//   @media (min-width: 768px) {
//     font-size: 2.25rem;
//   }
// `;

// const Subtitle = styled.p`
//   color: #6b7280;
//   font-size: 0.875rem;
//   margin-bottom: 1.5rem;
// `;

// const ProjectsGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 1.5rem;

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (min-width: 1024px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const ProjectCard = styled.div`
//   background: white;
//   border-radius: 0.75rem;
//   overflow: hidden;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   transition: all 0.2s ease;

//   &:hover {
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     transform: translateY(-2px);
//   }
// `;

// const CardHeader = styled.div`
//   padding: 1rem;
//   border-bottom: 1px solid #f3f4f6;
//   background: #f9fafb;
// `;

// const CardHeaderRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 0.5rem;
//   flex-wrap: wrap;
//   gap: 0.5rem;
// `;

// const ProjectName = styled.h2`
//   font-size: 1.125rem;
//   font-weight: 600;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const StatusBadge = styled.span<{ $status: string }>`
//   font-size: 0.7rem;
//   padding: 0.2rem 0.5rem;
//   border-radius: 0.25rem;
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   background: ${(props) =>
//     props.$status === "Planning"
//       ? "#f3f4f6"
//       : props.$status === "In Progress"
//         ? "#fef3c7"
//         : "#dcfce7"};
//   color: ${(props) =>
//     props.$status === "Planning"
//       ? "#374151"
//       : props.$status === "In Progress"
//         ? "#92400e"
//         : "#166534"};
// `;

// const Description = styled.p`
//   font-size: 0.875rem;
//   color: #6b7280;
//   line-height: 1.5;
// `;

// const CardBody = styled.div`
//   padding: 1rem;
// `;

// const Section = styled.div`
//   margin-bottom: 1rem;
// `;

// const SectionTitle = styled.h3`
//   font-size: 0.75rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   color: #6b7280;
//   margin-bottom: 0.5rem;
// `;

// const ServicesList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
// `;

// const ServiceTag = styled.span`
//   font-size: 0.7rem;
//   background: #eff6ff;
//   color: #1e40af;
//   padding: 0.25rem 0.5rem;
//   border-radius: 0.25rem;
// `;

// const LinksContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1rem;
// `;

// const Link = styled.a`
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   font-size: 0.875rem;
//   color: #3b82f6;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const DisabledLink = styled.span`
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   font-size: 0.875rem;
//   color: #9ca3af;
// `;

// const UpdateButton = styled.button`
//   width: 100%;
//   padding: 0.75rem;
//   background: #f3f4f6;
//   border-radius: 0.5rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: #4b5563;
//   transition: all 0.2s ease;

//   &:hover {
//     background: #e5e7eb;
//   }
// `;

// const EditForm = styled.div`
//   border-top: 1px solid #e5e7eb;
//   padding-top: 1rem;
//   margin-top: 0.5rem;
// `;

// const FormInput = styled.input`
//   width: 100%;
//   padding: 0.5rem;
//   border: 1px solid #d1d5db;
//   border-radius: 0.5rem;
//   font-size: 0.875rem;
//   margin-bottom: 0.5rem;

//   &:focus {
//     outline: none;
//     border-color: #3b82f6;
//   }
// `;

// const FormSelect = styled.select`
//   width: 100%;
//   padding: 0.5rem;
//   border: 1px solid #d1d5db;
//   border-radius: 0.5rem;
//   font-size: 0.875rem;
//   margin-bottom: 0.5rem;
//   background: white;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// const SaveButton = styled.button`
//   flex: 1;
//   padding: 0.5rem;
//   background: #3b82f6;
//   color: white;
//   border-radius: 0.5rem;
//   font-size: 0.875rem;

//   &:hover {
//     background: #2563eb;
//   }
// `;

// const CancelButton = styled.button`
//   flex: 1;
//   padding: 0.5rem;
//   background: #f3f4f6;
//   border-radius: 0.5rem;
//   font-size: 0.875rem;

//   &:hover {
//     background: #e5e7eb;
//   }
// `;

// const ResourcesSection = styled.div`
//   background: #eff6ff;
//   border-radius: 0.75rem;
//   padding: 1.25rem;
//   margin-top: 2rem;
// `;

// const ResourcesGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 1rem;

//   @media (min-width: 640px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const ResourceItem = styled.div`
//   h4 {
//     font-size: 0.875rem;
//     font-weight: 600;
//     margin-bottom: 0.25rem;
//   }
//   p {
//     font-size: 0.75rem;
//     color: #4b5563;
//     margin-bottom: 0.5rem;
//   }
//   a {
//     font-size: 0.75rem;
//     color: #3b82f6;
//   }
// `;

// const LoadingSpinner = styled.div`
//   text-align: center;
//   padding: 2rem;
//   color: #6b7280;
// `;

// export default function ProjectsPage() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState<string | null>(null);
//   const [editData, setEditData] = useState<{
//     liveUrl?: string;
//     githubUrl?: string;
//     status?: string;
//   }>({});

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch("/api/projects");
//         const data = await res.json();
//         setProjects(data);
//       } catch (error) {
//         console.error("Failed to fetch projects:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const updateProject = async (id: string) => {
//     try {
//       await fetch("/api/projects", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, ...editData }),
//       });
//       await fetchProjects();
//     } catch (error) {
//       console.error("Failed to update project:", error);
//     } finally {
//       setEditing(null);
//       setEditData({});
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "Deployed":
//         return <CheckCircle size={14} />;
//       case "In Progress":
//         return <Clock size={14} />;
//       default:
//         return <PlayCircle size={14} />;
//     }
//   };

//   if (loading) {
//     return (
//       <Container>
//         <LoadingSpinner>Loading projects...</LoadingSpinner>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Title>AWS Projects Portfolio</Title>
//       <Subtitle>Build these projects to prove your AWS skills</Subtitle>

//       <ProjectsGrid>
//         {projects.map((project) => (
//           <ProjectCard key={project.id}>
//             <CardHeader>
//               <CardHeaderRow>
//                 <ProjectName>
//                   <FolderGit2 size={18} color="#3b82f6" />
//                   {project.name}
//                 </ProjectName>
//                 <StatusBadge $status={project.status}>
//                   {getStatusIcon(project.status)}
//                   {project.status}
//                 </StatusBadge>
//               </CardHeaderRow>
//               <Description>{project.description}</Description>
//             </CardHeader>

//             <CardBody>
//               <Section>
//                 <SectionTitle>AWS Services Used</SectionTitle>
//                 <ServicesList>
//                   {project.awsServices.slice(0, 4).map((service) => (
//                     <ServiceTag key={service}>{service}</ServiceTag>
//                   ))}
//                   {project.awsServices.length > 4 && (
//                     <ServiceTag>+{project.awsServices.length - 4}</ServiceTag>
//                   )}
//                 </ServicesList>
//               </Section>

//               <LinksContainer>
//                 {project.liveUrl ? (
//                   <Link
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <ExternalLink size={14} /> Live Demo
//                   </Link>
//                 ) : (
//                   <DisabledLink>
//                     <ExternalLink size={14} /> No live URL yet
//                   </DisabledLink>
//                 )}
//                 {project.githubUrl ? (
//                   <Link
//                     href={project.githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <span>📦 GitHub</span>
//                   </Link>
//                 ) : (
//                   <DisabledLink>
//                     <span>📦 No GitHub yet</span>
//                   </DisabledLink>
//                 )}
//               </LinksContainer>

//               {editing === project.id ? (
//                 <EditForm>
//                   <FormInput
//                     placeholder="Live URL"
//                     defaultValue={project.liveUrl || ""}
//                     onChange={(e) =>
//                       setEditData({ ...editData, liveUrl: e.target.value })
//                     }
//                   />
//                   <FormInput
//                     placeholder="GitHub URL"
//                     defaultValue={project.githubUrl || ""}
//                     onChange={(e) =>
//                       setEditData({ ...editData, githubUrl: e.target.value })
//                     }
//                   />
//                   <FormSelect
//                     defaultValue={project.status}
//                     onChange={(e) =>
//                       setEditData({ ...editData, status: e.target.value })
//                     }
//                   >
//                     <option value="Planning">Planning</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Deployed">Deployed</option>
//                   </FormSelect>
//                   <ButtonGroup>
//                     <SaveButton onClick={() => updateProject(project.id)}>
//                       Save
//                     </SaveButton>
//                     <CancelButton onClick={() => setEditing(null)}>
//                       Cancel
//                     </CancelButton>
//                   </ButtonGroup>
//                 </EditForm>
//               ) : (
//                 <UpdateButton onClick={() => setEditing(project.id)}>
//                   Update Project Status
//                 </UpdateButton>
//               )}
//             </CardBody>
//           </ProjectCard>
//         ))}
//       </ProjectsGrid>

//       <ResourcesSection>
//         <h3
//           style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem" }}
//         >
//           📚 Project Resources
//         </h3>
//         <ResourcesGrid>
//           <ResourceItem>
//             <h4>Cloud Resume</h4>
//             <p>S3 + CloudFront + Lambda + DynamoDB</p>
//             <a href="#">View Guide →</a>
//           </ResourceItem>
//           <ResourceItem>
//             <h4>URL Shortener</h4>
//             <p>API Gateway + Lambda + DynamoDB</p>
//             <a href="#">View Guide →</a>
//           </ResourceItem>
//           <ResourceItem>
//             <h4>Image Pipeline</h4>
//             <p>S3 + SQS + Lambda + KMS</p>
//             <a href="#">View Guide →</a>
//           </ResourceItem>
//         </ResourcesGrid>
//       </ResourcesSection>
//     </Container>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FolderGit2,
  ExternalLink,
  CheckCircle,
  Clock,
  PlayCircle,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  liveUrl: string | null;
  githubUrl: string | null;
  awsServices: string[];
  deployedAt?: string;
}

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 1.5rem 2rem;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
`;

const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ProjectName = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusBadge = styled.span<{ $status: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: ${(props) =>
    props.$status === "Planning"
      ? "#f3f4f6"
      : props.$status === "In Progress"
        ? "#fef3c7"
        : "#dcfce7"};
  color: ${(props) =>
    props.$status === "Planning"
      ? "#374151"
      : props.$status === "In Progress"
        ? "#92400e"
        : "#166534"};
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const ServicesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ServiceTag = styled.span`
  font-size: 0.7rem;
  background: #eff6ff;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #3b82f6;

  &:hover {
    text-decoration: underline;
  }
`;

const DisabledLink = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #9ca3af;
`;

const UpdateButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #f3f4f6;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }
`;

const EditForm = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  background: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SaveButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:hover {
    background: #2563eb;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  background: #f3f4f6;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:hover {
    background: #e5e7eb;
  }
`;

const ResourcesSection = styled.div`
  background: #eff6ff;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-top: 2rem;
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ResourceItem = styled.div`
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.75rem;
    color: #4b5563;
    margin-bottom: 0.5rem;
  }
  a {
    font-size: 0.75rem;
    color: #3b82f6;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    liveUrl?: string;
    githubUrl?: string;
    status?: string;
  }>({});

  // Define fetchProjects as a separate function that can be called from anywhere
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchProjects on mount
  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProject = async (id: string) => {
    try {
      await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editData }),
      });

      // Refetch after update
      await fetchProjects();
    } catch (error) {
      console.error("Failed to update project:", error);
    } finally {
      setEditing(null);
      setEditData({});
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Deployed":
        return <CheckCircle size={14} />;
      case "In Progress":
        return <Clock size={14} />;
      default:
        return <PlayCircle size={14} />;
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading projects...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Title>AWS Projects Portfolio</Title>
      <Subtitle>Build these projects to prove your AWS skills</Subtitle>

      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <CardHeader>
              <CardHeaderRow>
                <ProjectName>
                  <FolderGit2 size={18} color="#3b82f6" />
                  {project.name}
                </ProjectName>
                <StatusBadge $status={project.status}>
                  {getStatusIcon(project.status)}
                  {project.status}
                </StatusBadge>
              </CardHeaderRow>
              <Description>{project.description}</Description>
            </CardHeader>

            <CardBody>
              <Section>
                <SectionTitle>AWS Services Used</SectionTitle>
                <ServicesList>
                  {project.awsServices.slice(0, 4).map((service) => (
                    <ServiceTag key={service}>{service}</ServiceTag>
                  ))}
                  {project.awsServices.length > 4 && (
                    <ServiceTag>+{project.awsServices.length - 4}</ServiceTag>
                  )}
                </ServicesList>
              </Section>

              <LinksContainer>
                {project.liveUrl ? (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </Link>
                ) : (
                  <DisabledLink>
                    <ExternalLink size={14} /> No live URL yet
                  </DisabledLink>
                )}
                {project.githubUrl ? (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>📦 GitHub</span>
                  </Link>
                ) : (
                  <DisabledLink>
                    <span>📦 No GitHub yet</span>
                  </DisabledLink>
                )}
              </LinksContainer>

              {editing === project.id ? (
                <EditForm>
                  <FormInput
                    placeholder="Live URL"
                    defaultValue={project.liveUrl || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, liveUrl: e.target.value })
                    }
                  />
                  <FormInput
                    placeholder="GitHub URL"
                    defaultValue={project.githubUrl || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, githubUrl: e.target.value })
                    }
                  />
                  <FormSelect
                    defaultValue={project.status}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Deployed">Deployed</option>
                  </FormSelect>
                  <ButtonGroup>
                    <SaveButton onClick={() => updateProject(project.id)}>
                      Save
                    </SaveButton>
                    <CancelButton onClick={() => setEditing(null)}>
                      Cancel
                    </CancelButton>
                  </ButtonGroup>
                </EditForm>
              ) : (
                <UpdateButton onClick={() => setEditing(project.id)}>
                  Update Project Status
                </UpdateButton>
              )}
            </CardBody>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <ResourcesSection>
        <h3
          style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem" }}
        >
          📚 Project Resources
        </h3>
        <ResourcesGrid>
          <ResourceItem>
            <h4>Cloud Resume</h4>
            <p>S3 + CloudFront + Lambda + DynamoDB</p>
            <a href="#">View Guide →</a>
          </ResourceItem>
          <ResourceItem>
            <h4>URL Shortener</h4>
            <p>API Gateway + Lambda + DynamoDB</p>
            <a href="#">View Guide →</a>
          </ResourceItem>
          <ResourceItem>
            <h4>Image Pipeline</h4>
            <p>S3 + SQS + Lambda + KMS</p>
            <a href="#">View Guide →</a>
          </ResourceItem>
        </ResourcesGrid>
      </ResourcesSection>
    </Container>
  );
}
