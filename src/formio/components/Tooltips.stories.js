import {withUtrechtDocument} from 'story-utils/decorators';

import {SingleFormioComponent} from './story-util';

export default {
  title: 'Form.io components / Vanilla / Tooltips',
  decorators: [withUtrechtDocument],
  args: {
    evalContext: {},
  },
  argTypes: {
    components: {type: {name: 'array', required: true}},
    evalContext: {table: {disable: true}},
  },
  parameters: {
    controls: {sort: 'requiredFirst'},
  },
};

export const Default = {
  render: SingleFormioComponent,
  args: {
    key: 'cols1',
    type: 'columns',
    label: 'Columns 1',
    extraComponentProperties: {
      columns: [
        {
          size: 2,
          components: [
            {
              key: 'howManyDroidsDidYouDestroy',
              type: 'textfield',
              label: '# droids destroyed?',
              tooltip: 'This tooltip gets the default right placement.',
            },
          ],
        },
        {
          size: 6,
          components: [
            {
              key: 'whatAboutDroidekas',
              type: 'textfield',
              label: "What about Droideka's?",
            },
          ],
        },
        {
          size: 4,
          components: [
            {
              key: 'doYouTrustYourClones',
              type: 'textfield',
              label: 'Do you trust your clones?',
              tooltip:
                "This tooltip should automatically be placed  to the left, because there's no room to the right.",
            },
          ],
        },
      ],
    },
  },
};
