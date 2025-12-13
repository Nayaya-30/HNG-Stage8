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
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold text-brand-gold drop-shadow">Settings</h1>
        <p className="mt-1 text-white/60">
          Manage your account and widget preferences
        </p>
      </div>

      {/* Account Settings */}
      <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-brand-gold">Account Settings</CardTitle>
          <CardDescription className="text-white/60">Update your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-slate-200">Company Name</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">Change Password</Label>
            <Button variant="outline" className="w-full sm:w-auto bg-slate-950 border border-slate-700 text-white hover:bg-slate-800">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-brand-gold">Notifications</CardTitle>
          <CardDescription className="text-white/60">Configure how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-200">Tour Completed</Label>
              <p className="text-sm text-white/60">Get notified when users complete tours</p>
            </div>
            <Switch
              checked={settings.notifications.tourCompleted}
              onCheckedChange={(checked: boolean) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, tourCompleted: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-200">Tour Abandoned</Label>
              <p className="text-sm text-white/60">Get notified when users abandon tours</p>
            </div>
            <Switch
              checked={settings.notifications.tourAbandoned}
              onCheckedChange={(checked: boolean) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, tourAbandoned: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-200">Weekly Report</Label>
              <p className="text-sm text-white/60">Receive weekly analytics summary</p>
            </div>
            <Switch
              checked={settings.notifications.weeklyReport}
              onCheckedChange={(checked: boolean) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, weeklyReport: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-200">Monthly Report</Label>
              <p className="text-sm text-white/60">Receive monthly analytics summary</p>
            </div>
            <Switch
              checked={settings.notifications.monthlyReport}
              onCheckedChange={(checked: boolean) =>
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
      <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-brand-gold">Widget Customization</CardTitle>
          <CardDescription className="text-white/60">Customize the appearance of your tour widget</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor" className="text-slate-200">Primary Color</Label>
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
                className="w-20 h-10 bg-slate-950 border border-slate-800"
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
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-200">Show 3D Avatar</Label>
              <p className="text-sm text-white/60">Display animated 3D avatar in widget</p>
            </div>
            <Switch
              checked={settings.widget.showAvatar}
              onCheckedChange={(checked: boolean) =>
                setSettings({
                  ...settings,
                  widget: { ...settings.widget, showAvatar: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-200">Auto-start Tours</Label>
              <p className="text-sm text-white/60">Automatically start tours for new users</p>
            </div>
            <Switch
              checked={settings.widget.autoStart}
              onCheckedChange={(checked: boolean) =>
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
      <Card className="bg-red-950/40 border border-red-500/40 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription className="text-white/60">Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Delete Account</p>
              <p className="text-sm text-white/60">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="bg-amber-300 text-slate-950 hover:bg-amber-200">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
