import React, { useState } from 'react';
import { ScrollView, View, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography, Button, Card, Badge, Avatar, Divider, Table } from '../../src/components/ui';
import { List, Tabs, Accordion, AccordionItem, Dropdown } from '../../src/components/layout';
import {
  Modal,
  ModalContent,
  Alert,
  SkeletonLine,
  SkeletonCard,
} from '../../src/components/feedback';

function CodeSnippet({ code }: { code: string }) {
  const [open, setOpen] = useState(false);

  return (
    <View className="mt-2">
      <Pressable onPress={() => setOpen(!open)} className="flex-row items-center gap-1">
        <MaterialIcons
          name={open ? 'expand-less' : 'code'}
          size={16}
          color="rgba(255,255,255,0.4)"
        />
        <Text className="text-white/40 text-xs font-body">{open ? 'Hide code' : 'Show code'}</Text>
      </Pressable>
      {open && (
        <View className="bg-white/5 rounded-xl p-3 mt-2">
          <Text className="text-neutral-400 text-xs" style={{ fontFamily: 'monospace' }}>
            {code}
          </Text>
        </View>
      )}
    </View>
  );
}

function SectionHeading({ children, first }: { children: string; first?: boolean }) {
  return (
    <Typography variant="h2" className={first ? 'mt-4 mb-4' : 'mt-8 mb-4'}>
      {children}
    </Typography>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="mt-6">
      <Typography variant="label" className="mb-3 text-white/50">
        {label}
      </Typography>
      {children}
    </View>
  );
}

export default function ComponentsScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView className="flex-1 bg-black px-4 py-6">
      <Typography variant="h1">Component Library</Typography>
      <Typography variant="body" className="mt-2 mb-2">
        Interactive playground for all UI components and their variants.
      </Typography>

      <SectionHeading first>Core UI</SectionHeading>

      {/* Typography */}
      <SubSection label="Typography">
        <View className="gap-3">
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              h1
            </Typography>
            <Typography variant="h1">Heading One</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              h2
            </Typography>
            <Typography variant="h2">Heading Two</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              h3
            </Typography>
            <Typography variant="h3">Heading Three</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              body
            </Typography>
            <Typography variant="body">
              Body text using Inter Regular for readable content.
            </Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              caption
            </Typography>
            <Typography variant="caption">Caption text for metadata</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              label
            </Typography>
            <Typography variant="label">Label Text</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              button
            </Typography>
            <Typography variant="button" className="text-white">
              Button Text
            </Typography>
          </View>
        </View>
        <CodeSnippet
          code={`<Typography variant="h1">Heading</Typography>\n<Typography variant="body">Body text</Typography>\n<Typography variant="caption">Caption</Typography>`}
        />
      </SubSection>

      {/* Button */}
      <SubSection label="Button">
        <View className="gap-4">
          <View className="flex-row flex-wrap gap-3 items-center">
            <Button variant="primary" label="Primary" onPress={() => {}} />
            <Button variant="secondary" label="Secondary" onPress={() => {}} />
            <Button variant="outline" label="Outline" onPress={() => {}} />
            <Button variant="primary" label="Disabled" disabled />
          </View>
          <View className="flex-row flex-wrap gap-3 items-center">
            <Button variant="primary" size="sm" label="Small" onPress={() => {}} />
            <Button variant="primary" label="With Icon" icon="add" onPress={() => {}} />
            <Button variant="primary" label="Loading" loading />
          </View>
          <View className="flex-row flex-wrap gap-3 items-center">
            <Button
              variant="primary"
              color="danger"
              label="Danger"
              icon="delete"
              onPress={() => {}}
            />
          </View>
        </View>
        <CodeSnippet
          code={`<Button variant="primary" label="Save" onPress={handleSave} />\n<Button variant="outline" label="Cancel" onPress={handleCancel} />\n<Button variant="primary" color="danger" label="Delete" icon="delete" />`}
        />
      </SubSection>

      {/* Card */}
      <SubSection label="Card">
        <View className="gap-4">
          <Card
            header={<Typography variant="h3">Card Title</Typography>}
            footer={
              <View className="flex-row justify-end">
                <Button variant="text" size="sm" label="Action" onPress={() => {}} />
              </View>
            }
          >
            <Typography variant="body">
              Card body content with header and footer slots. Cards use subtle borders for
              definition.
            </Typography>
          </Card>

          <Card onPress={() => {}}>
            <Typography variant="body">
              Pressable card - tap to see scale animation. Useful for navigation items and
              interactive lists.
            </Typography>
          </Card>
        </View>
        <CodeSnippet
          code={`<Card header={<Typography variant="h3">Title</Typography>}>\n  <Typography variant="body">Content</Typography>\n</Card>`}
        />
      </SubSection>

      {/* Badge */}
      <SubSection label="Badge">
        <View className="flex-row flex-wrap gap-3 items-center">
          <Badge type="success" label="Success" />
          <Badge type="info" label="Info" />
          <Badge type="warning" label="Warning" />
          <Badge type="error" label="Error" />
        </View>
        <CodeSnippet
          code={`<Badge type="success" label="Active" />\n<Badge type="error" label="Failed" />\n<Badge type="warning" label="Pending" />`}
        />
      </SubSection>

      {/* Avatar */}
      <SubSection label="Avatar">
        <View className="gap-4">
          <View className="flex-row flex-wrap gap-3 items-center">
            <Avatar name="Jim V" size="sm" />
            <Avatar name="Sarah Connor" size="md" />
            <Avatar name="Tony Stark" size="lg" />
          </View>
          <View className="flex-row flex-wrap gap-3 items-center">
            <Avatar imageUri="https://i.pravatar.cc/100" size="md" />
            <Typography variant="caption">Image mode</Typography>
          </View>
        </View>
        <CodeSnippet
          code={`<Avatar name="Jim V" size="lg" />\n<Avatar imageUri="https://example.com/photo.jpg" size="md" />`}
        />
      </SubSection>

      {/* Divider */}
      <SubSection label="Divider">
        <View className="gap-3">
          <Typography variant="body">Content above divider</Typography>
          <Divider />
          <Typography variant="body">Content below divider</Typography>
        </View>
        <CodeSnippet code={`<Divider />\n<Divider className="my-4" />`} />
      </SubSection>

      {/* ===== LAYOUT SECTION ===== */}
      <SectionHeading>Layout</SectionHeading>

      {/* Table */}
      <SubSection label="Table">
        <Table
          headers={['Name', 'Role', 'Status']}
          rows={[
            ['Alice Johnson', 'Engineer', <Badge key="s1" type="success" label="Active" />],
            ['Bob Smith', 'Designer', <Badge key="s2" type="info" label="Remote" />],
            ['Carol White', 'PM', <Badge key="s3" type="warning" label="Away" />],
            ['Dave Brown', 'QA', <Badge key="s4" type="error" label="Offline" />],
          ]}
        />
        <CodeSnippet
          code={`<Table\n  headers={['Name', 'Role', 'Status']}\n  rows={[\n    ['Alice', 'Engineer', <Badge type="success" label="Active" />],\n    ['Bob', 'Designer', <Badge type="info" label="Remote" />],\n  ]}\n/>`}
        />
      </SubSection>

      {/* List */}
      <SubSection label="List">
        <View className="border border-white/15 rounded-2xl overflow-hidden">
          <List
            items={[
              { id: '1', content: <Typography variant="body">Dashboard overview</Typography> },
              { id: '2', content: <Typography variant="body">User management</Typography> },
              { id: '3', content: <Typography variant="body">Analytics reports</Typography> },
              { id: '4', content: <Typography variant="body">System settings</Typography> },
              { id: '5', content: <Typography variant="body">Notifications</Typography> },
            ]}
            onItemPress={(id) => console.log('Pressed item:', id)}
          />
        </View>
        <CodeSnippet
          code={`<List\n  items={[\n    { id: '1', content: <Typography>Item one</Typography> },\n    { id: '2', content: <Typography>Item two</Typography> },\n  ]}\n  onItemPress={(id) => console.log(id)}\n  divider\n/>`}
        />
      </SubSection>

      {/* Tabs */}
      <SubSection label="Tabs">
        <View className="border border-white/15 rounded-2xl overflow-hidden">
          <Tabs
            tabs={[
              { key: 'overview', label: 'Overview' },
              { key: 'details', label: 'Details' },
              { key: 'settings', label: 'Settings' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <View className="p-4">
            {activeTab === 'overview' && (
              <Typography variant="body">
                Overview content: A high-level summary of your project status and key metrics.
              </Typography>
            )}
            {activeTab === 'details' && (
              <Typography variant="body">
                Details content: In-depth information about individual items, logs, and history.
              </Typography>
            )}
            {activeTab === 'settings' && (
              <Typography variant="body">
                Settings content: Configure preferences, notifications, and account options.
              </Typography>
            )}
          </View>
        </View>
        <CodeSnippet
          code={`<Tabs\n  tabs={[\n    { key: 'overview', label: 'Overview' },\n    { key: 'details', label: 'Details' },\n  ]}\n  activeTab={activeTab}\n  onTabChange={setActiveTab}\n/>`}
        />
      </SubSection>

      {/* Accordion */}
      <SubSection label="Accordion">
        <Accordion>
          <AccordionItem title="Getting Started" defaultOpen>
            <Typography variant="body">
              Welcome to the component library. This section covers setup instructions, project
              structure, and initial configuration steps to get you up and running quickly.
            </Typography>
          </AccordionItem>
          <AccordionItem title="API Reference">
            <Typography variant="body">
              Detailed documentation for all component props, methods, and events. Each component
              follows consistent patterns for styling and interaction.
            </Typography>
          </AccordionItem>
          <AccordionItem title="Advanced Usage">
            <Typography variant="body">
              Learn about composition patterns, custom theming, animation integration, and
              performance optimization techniques for complex UIs.
            </Typography>
          </AccordionItem>
        </Accordion>
        <CodeSnippet
          code={`<Accordion>\n  <AccordionItem title="Section" defaultOpen>\n    <Typography variant="body">Content</Typography>\n  </AccordionItem>\n</Accordion>`}
        />
      </SubSection>

      {/* Skeleton */}
      <SubSection label="Skeleton">
        <View className="gap-4">
          <View className="gap-3">
            <Typography variant="caption" className="text-white/40">
              SkeletonLine widths
            </Typography>
            <SkeletonLine width="100%" />
            <SkeletonLine width="75%" />
            <SkeletonLine width="50%" />
          </View>

          <View>
            <Typography variant="caption" className="text-white/40 mb-3">
              SkeletonCard
            </Typography>
            <SkeletonCard lines={3} />
          </View>

          <View>
            <Typography variant="caption" className="text-white/40 mb-3">
              Skeleton vs Loaded
            </Typography>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <SkeletonCard lines={3} />
              </View>
              <View className="flex-1">
                <Card>
                  <Typography variant="body" className="text-white">
                    Loaded content
                  </Typography>
                  <Typography variant="caption" className="mt-1">
                    Data has finished loading and is now visible to the user.
                  </Typography>
                </Card>
              </View>
            </View>
          </View>
        </View>
        <CodeSnippet code={`<SkeletonLine width="75%" />\n<SkeletonCard lines={3} />`} />
      </SubSection>

      {/* ===== FEEDBACK SECTION ===== */}
      <SectionHeading>Feedback</SectionHeading>

      {/* Modal */}
      <SubSection label="Modal">
        <View className="gap-4">
          <Button
            variant="outline"
            label="Open Modal"
            icon="open-in-new"
            onPress={() => setModalVisible(true)}
          />
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <ModalContent
              title="Demo Modal"
              onClose={() => setModalVisible(false)}
              footer={
                <View className="flex-row justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    label="Cancel"
                    onPress={() => setModalVisible(false)}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    label="Confirm"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              }
            >
              <Typography variant="body">
                This modal demonstrates the centered overlay with a semi-transparent backdrop. Tap
                the backdrop or the close icon to dismiss.
              </Typography>
            </ModalContent>
          </Modal>
        </View>
        <CodeSnippet
          code={`<Modal visible={visible} onClose={() => setVisible(false)}>\n  <ModalContent\n    title="Dialog"\n    onClose={() => setVisible(false)}\n    footer={<Button label="OK" onPress={close} />}\n  >\n    <Typography>Modal body content</Typography>\n  </ModalContent>\n</Modal>`}
        />
      </SubSection>

      {/* Alert */}
      <SubSection label="Alert">
        <View className="gap-3">
          <Alert
            type="success"
            title="Success"
            message="Your changes have been saved successfully."
          />
          <Alert
            type="info"
            title="Information"
            message="A new version is available. Update to get the latest features."
          />
          <Alert type="warning" title="Warning" message="Your session will expire in 5 minutes." />
          <Alert
            type="error"
            title="Error"
            message="Failed to connect to the server. Please try again later."
            onDismiss={() => {}}
          />
        </View>
        <CodeSnippet
          code={`<Alert type="success" title="Saved" message="Changes saved." />\n<Alert type="error" message="Something went wrong." onDismiss={dismiss} />\n<Alert type="warning" visible={show} message="Session expiring." />`}
        />
      </SubSection>

      {/* Dropdown */}
      <SubSection label="Dropdown">
        <Dropdown
          trigger={
            <Button variant="secondary" label="Actions" icon="more-vert" onPress={() => {}} />
          }
          items={[
            { key: 'edit', label: 'Edit', icon: 'edit', onPress: () => {} },
            { key: 'duplicate', label: 'Duplicate', icon: 'content-copy', onPress: () => {} },
            { key: 'share', label: 'Share', icon: 'share', onPress: () => {} },
            {
              key: 'delete',
              label: 'Delete',
              icon: 'delete',
              onPress: () => {},
              destructive: true,
            },
          ]}
        />
        <CodeSnippet
          code={`<Dropdown\n  trigger={<Button label="Actions" icon="more-vert" />}\n  items={[\n    { key: 'edit', label: 'Edit', icon: 'edit', onPress: handleEdit },\n    { key: 'delete', label: 'Delete', icon: 'delete', onPress: handleDelete, destructive: true },\n  ]}\n/>`}
        />
      </SubSection>

      {/* Bottom spacing */}
      <View className="h-20" />
    </ScrollView>
  );
}
