'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateTourButton() {
  return (
    <Button>
      <Link href="/dashboard/tours/new">
        <PlusIcon className="mr-2 h-4 w-4" />
        Create Tour
      </Link>
    </Button>
  );
}