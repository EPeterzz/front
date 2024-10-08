import React, { useState } from 'react';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';
import Timetags from './timetags';
import Modal from './modal'; 
import PathPage from './paths'; 
import '../../../css/Mypath.css'; 

const getFormattedDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

function MyPathPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedTags, setSelectedTags] = useState([]);

  const data = [
    {
      date: getFormattedDate(0),
      records: [
        { dots: ['#F9B8BC', '#7079BC', '#59AF7E'], start: '', end: '' }
      ]
    },
  ];

  const tags = [
    { text: '#차분힐링', color: '#59AF7E' },
    { text: '#초록초록', color: '#59AF7E' },
    { text: '#피로회복', color: '#7079BC' },
    { text: '#도파민디톡스', color: '#F9B8BC' },
    { text: '#에너지넘치는', color: '#F9B8BC' }
  ];

  const handleDateClick = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  return (
    <PageContainer>
      <AppBar title='마이페이지' />
      <div className="mypathTagsContainer">
        <div className="mypathTagsRow">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`mypathTag ${selectedTags.includes(tag.text) ? 'selected' : ''}`}
              style={{ backgroundColor: tag.color }}
              onClick={() => handleTagClick(tag.text)}
            >
              {tag.text}
            </span>
          ))}
        </div>
        <div className="mypathTagsRow large">
          {tags.slice(3).map((tag, index) => (
            <span
              key={index}
              className={`mypathTag ${selectedTags.includes(tag.text) ? 'selected' : ''}`}
              style={{ backgroundColor: tag.color }}
              onClick={() => handleTagClick(tag.text)}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>
      <ContentContainer>
        {data.map((item, index) => (
          <div key={index} onClick={handleDateClick}>
            <Timetags
              date={item.date}
              records={item.records}
            />
          </div>
        ))}
      </ContentContainer>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PathPage /> 
      </Modal>
    </PageContainer>
  );
}

export default MyPathPage;