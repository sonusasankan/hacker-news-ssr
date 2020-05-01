import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import List from '../List/';

configure({ adapter: new Adapter() });

const news = [
  {
    created_at: '2020-04-18T22:10:14.000Z',
    title: 'It’s Time to Build',
    url: 'https://a16z.com/2020/04/18/its-time-to-build/',
    author: 'jger15',
    points: 764,
    story_text: null,
    comment_text: null,
    num_comments: 481,
    story_id: null,
    story_title: null,
    story_url: null,
    parent_id: null,
    created_at_i: 1587247814,
    _tags: ['story', 'author_jger15', 'story_22911533', 'front_page'],
    objectID: '22911533',
    _highlightResult: {
      title: {
        value: 'It’s Time to Build',
        matchLevel: 'none',
        matchedWords: [],
      },
      url: {
        value: 'https://a16z.com/2020/04/18/its-time-to-build/',
        matchLevel: 'none',
        matchedWords: [],
      },
      author: {
        value: 'jger15',
        matchLevel: 'none',
        matchedWords: [],
      },
    },
  },
  {
    created_at: '2020-04-18T15:06:27.000Z',
    title: 'TablePlus – Modern, Native Tool for Database Management',
    url: 'https://tableplus.com/',
    author: 'bottle2',
    points: 441,
    story_text: null,
    comment_text: null,
    num_comments: 157,
    story_id: null,
    story_title: null,
    story_url: null,
    parent_id: null,
    created_at_i: 1587222387,
    _tags: ['story', 'author_bottle2', 'story_22908224', 'front_page'],
    objectID: '22908224',
    _highlightResult: {
      title: {
        value: 'TablePlus – Modern, Native Tool for Database Management',
        matchLevel: 'none',
        matchedWords: [],
      },
      url: {
        value: 'https://tableplus.com/',
        matchLevel: 'none',
        matchedWords: [],
      },
      author: {
        value: 'bottle2',
        matchLevel: 'none',
        matchedWords: [],
      },
    },
  },
];

describe('List', () => {
  const div = mount(<List news={news} />);
  it('should display list', () => {
    expect(div).toBeTruthy();
  });
  it('should display two items', () => {
    const item = div.find('.item');
    expect(item.length).toEqual(2);
  });
  it('should have the first title match', () => {
    const title = news[0].title;
    const item = div.find('.item').at(0);
    const itemTitle = item.find('.title');
    expect(itemTitle.text()).toEqual(title);
  });
});
