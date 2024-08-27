import React from 'react';
import Header from '../components/Header/Header';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import PageHeader from '../components/PageHeader/PageHeader';

const GenerateSchedulePage = () => {
  return (
    <div>
      <PageHeader>Generate Schedule Page</PageHeader>
      <ButtonLink href="/manual/edit">manually</ButtonLink>
      <ButtonLink href="/generate/automatic">automatically</ButtonLink>
    </div>
  );
};

export default GenerateSchedulePage;
