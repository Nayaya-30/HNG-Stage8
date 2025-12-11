'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'My Company',
    email: 'user@example.com',
    notifications: {
      tourCompleted: true,
      tourAbandoned: true,
      weeklyReport: false,
      monthlyReport: true,
    },
    widget: {
      primaryColor: '#4f46e5',
      position: 'bottom-right',
      showAvatar: true,
      autoStart: false,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to Convex
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">
          Manage your account and widget preferences
        </p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Change Password</Label>
            <Button variant="outline" className="w-full sm:w-auto">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tour Completed</Label>
              <p className="text-sm text-gray-500">Get notified when users complete tours</p>
            </div>
            <Switch
              checked={settings.notifications.tourCompleted}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, tourCompleted: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tour Abandoned</Label>
              <p className="text-sm text-gray-500">Get notified when users abandon tours</p>
            </div>
            <Switch
              checked={settings.notifications.tourAbandoned}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, tourAbandoned: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Report</Label>
              <p className="text-sm text-gray-500">Receive weekly analytics summary</p>
            </div>
            <Switch
              checked={settings.notifications.weeklyReport}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, weeklyReport: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Monthly Report</Label>
              <p className="text-sm text-gray-500">Receive monthly analytics summary</p>
            </div>
            <Switch
              checked={settings.notifications.monthlyReport}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, monthlyReport: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Widget Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Widget Customization</CardTitle>
          <CardDescription>Customize the appearance of your tour widget</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={settings.widget.primaryColor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    widget: { ...settings.widget, primaryColor: e.target.value },
                  })
                }
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={settings.widget.primaryColor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    widget: { ...settings.widget, primaryColor: e.target.value },
                  })
                }
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show 3D Avatar</Label>
              <p className="text-sm text-gray-500">Display animated 3D avatar in widget</p>
            </div>
            <Switch
              checked={settings.widget.showAvatar}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  widget: { ...settings.widget, showAvatar: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-start Tours</Label>
              <p className="text-sm text-gray-500">Automatically start tours for new users</p>
            </div>
            <Switch
              checked={settings.widget.autoStart}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  widget: { ...settings.widget, autoStart: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
