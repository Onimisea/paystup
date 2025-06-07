"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  expiresAt: string;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function CountdownTimer({ expiresAt, className = "" }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const calculateTimeRemaining = (): TimeRemaining => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const difference = expiry - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
    };
  };

  useEffect(() => {
    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every minute (60 seconds)
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const formatTimeUnit = (value: number, unit: string): string => {
    if (value === 0) return "";
    return `${value} ${unit}${value !== 1 ? "s" : ""}`;
  };

  const getTimeString = (): string => {
    if (timeRemaining.isExpired) {
      return "Expired";
    }

    const parts = [];
    
    if (timeRemaining.days > 0) {
      parts.push(formatTimeUnit(timeRemaining.days, "day"));
    }
    
    if (timeRemaining.hours > 0) {
      parts.push(formatTimeUnit(timeRemaining.hours, "hour"));
    }
    
    if (timeRemaining.minutes > 0 || (timeRemaining.days === 0 && timeRemaining.hours === 0)) {
      parts.push(formatTimeUnit(timeRemaining.minutes, "minute"));
    }

    return parts.length > 0 ? parts.join(", ") + " remaining" : "Less than a minute remaining";
  };

  const getUrgencyColor = (): string => {
    if (timeRemaining.isExpired) {
      return "text-red-600";
    }
    
    const totalMinutes = timeRemaining.days * 24 * 60 + timeRemaining.hours * 60 + timeRemaining.minutes;
    
    if (totalMinutes < 60) { // Less than 1 hour
      return "text-red-600";
    } else if (totalMinutes < 24 * 60) { // Less than 1 day
      return "text-orange-600";
    } else {
      return "text-yellow-600";
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className={`w-4 h-4 ${getUrgencyColor()}`} />
      <span className={`font-medium ${getUrgencyColor()}`}>
        {getTimeString()}
      </span>
    </div>
  );
}
