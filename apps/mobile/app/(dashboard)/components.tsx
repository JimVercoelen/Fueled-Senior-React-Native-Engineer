import React, { useState } from 'react';
import { ScrollView, View, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography, Button, Card, Badge, Avatar, Divider } from '../../src/components/ui';

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

      {/* Bottom spacing */}
      <View className="h-20" />
    </ScrollView>
  );
}
