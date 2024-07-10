'use client';

import { useParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { MintDrawer } from '@/components/shared/mint-drawer';
import { DataContext } from '@/contexts/data-provider';
import { ProjectInfo } from '@/components/shared/project-info';
import { useContext, useEffect } from 'react';

export default function Project() {
  const params = useParams<{ projectId: string }>();
  const {
    data: { projects, projectTotalSupply },
    fetchAllProjectData,
  } = useContext(DataContext);
  const projectId = Number(params.projectId);
  const project = projects[projectId];

  useEffect(() => {
    fetchAllProjectData(projectId);
  }, [projectId]);

  return (
    <>
      {!project ? (
        <Breadcrumbs layers={['Home', 'Projects', '...']} />
      ) : (
        <Breadcrumbs layers={['Home', 'Projects', project.name]} />
      )}
      {project && projectTotalSupply != null && <ProjectInfo project={project} totalSupply={projectTotalSupply} />}
    </>
  );
}
